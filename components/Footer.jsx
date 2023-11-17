import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="footer flex justify-center p-5 text-sm text-gray-400 h-[13vmax] items-center flex-wrap">
      <div className="left flex flex-1 flex-wrap">
        <div className="img-container relative h-[3vmax] w-[8vmax]">
          <Image
            className="bg-black p-2"
            src="https://s2.bunnycdn.ru/assets/sites/animesuge/logo.png"
            fill={true}
            alt="image"
            sizes={100}
          />
        </div>
        <p className="mx-2">Copyright © animesuge.to. All Rights Reserved</p>
      </div>
      <div className="right flex-1">
        <p>
          Made with for anime users! Disclaimer: This site does not store any
          files on its server. All contents are provided by non-affiliated third
          parties.
        </p>
      </div>
    </div>
  );
};

export default Footer;
