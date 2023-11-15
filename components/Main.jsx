import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Search from "./Search";

const Main = () => {
  return (
    <main>
      <div className="container">
        <div className="image-container relative h-[20vmax]">
          <Image
            className="object-cover"
            src="https://r4.wallpaperflare.com/wallpaper/695/331/660/digital-art-artwork-women-cityscape-wallpaper-59b0881d51fa2dfbf647a81ff071b6dd.jpg"
            fill={true}
            alt="image"
          />
          <Search/>
        </div>
        <div className="bottom-container mt-20 relative flex-wrap mb-7">
          <div className="title font-bold text-gray-500">
            WATCH ANIME ONLINE
          </div>
          <p>
            AnimeSuge is a free streaming anime website that allows you to watch
            anime online in English subbed and dubbed. Join us and watch anime
            online for free with ease. Easy access and no registration is
            required. Our content is updated daily with fast streaming servers
            and great features that help you easily track and watch your
            favorite anime. We are confident AnimeSuge is the best free anime
            streaming site in the space that you can't simply miss!
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;
