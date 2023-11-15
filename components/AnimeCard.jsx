import Image from "next/image";
import Link from "next/link";
import React from "react";

const AnimeCard = ({ anime }) => {
  var image = anime?.images?.jpg?.large_image_url;
  var name = anime?.title;
  var episodes = anime?.episodes;
  var type = anime?.type;

  return (
    <div className="anime-card-container w-[10vmax] flex flex-col mx-3 my-3">
      <Link href={"/"}>
        <div className="anime-img relative h-[15vmax] overflow-hidden">
          <div className="type-anime absolute bg-red-600 z-10 shadow-md shadow-slate-800 text-xs p-[0.1vmax]">
            {type}
          </div>
          <Image className="object-cover transition hover:scale-105 " src={image} fill={true} alt="image" />
        </div>
        
        <div className="anime-episodes text-center">
          {episodes ? episodes : anime?.status}
        </div>

        <div className="anime-name text-center break-words">{name}</div>
      </Link>
    </div>
  );
};

export default AnimeCard;
