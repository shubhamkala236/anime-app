import List from "@/components/List";
import Search from "@/components/Search";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="home-container">
      <div className="image-search-container h-[20vmax]">
        <div className="inner relative h-full mx-[15%]">
          <Image
            className="object-cover"
            src="https://r4.wallpaperflare.com/wallpaper/695/331/660/digital-art-artwork-women-cityscape-wallpaper-59b0881d51fa2dfbf647a81ff071b6dd.jpg"
            fill={true}
            alt="image"
          />
          <Search/>
        </div>
      </div>
      <div className="list-container mx-16">
        <List />
      </div>
    </div>
  );
};

export default page;
