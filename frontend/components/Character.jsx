import Image from "next/image";
import React from "react";

const Character = ({ character }) => {
  let name = character?.character?.name;
  let role = character?.role;
  let img = character?.character?.images?.jpg.image_url;

  return (
    <div className="character-details flex flex-row flex-wrap my-3 justify-center items-center border border-purple-400 mx-4">
      <div className="image-container h-[10vmax] w-[6vmax] relative">
        <Image
            className="object-cover"
            src={img}
            alt="image"
            fill={true}
        />
      </div>

      <div className="details flex flex-col w-[8vmax] break-words p-1">
        <div className="name"> <span className="text-purple-400 font-semibold">Name: </span>{name}</div>
        <div className="role"> <span className="text-purple-400 font-semibold">Role: </span>{role}</div>
      </div>
    </div>
  );
};

export default Character;
