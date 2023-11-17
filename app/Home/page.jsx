'use client'
import List from "@/components/List";
import Search from "@/components/Search";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Pagination,
} from "@nextui-org/pagination";


const page = () => {

  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getData = async () => {
      let data = await fetch(
        `https://api.jikan.moe/v4/anime?limit=24&page=${currentPage}`
      );
      data = await data.json();
      setTotalPages(data?.pagination?.last_visible_page);
      data = data.data;
      setAnimeList(data);
    };
    getData();
  }, [currentPage]);


  return (
    <div className="home-container">
      <div className="image-search-container h-[20vmax]">
        <div className="inner relative h-full mx-[15%]">
          <Image
            className="object-cover"
            src="https://r4.wallpaperflare.com/wallpaper/695/331/660/digital-art-artwork-women-cityscape-wallpaper-59b0881d51fa2dfbf647a81ff071b6dd.jpg"
            fill={true}
            alt="image"
            sizes={100}
          />
          <Search/>
        </div>
      </div>
      <div className="list-container mx-16">
        <List animeList={animeList}/>
      </div>
      <div className="pagination flex justify-center my-6">
        <Pagination
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={setCurrentPage}
          size="lg"
          color="success"
          showShadow
        />
      </div>
    </div>
  );
};

export default page;
