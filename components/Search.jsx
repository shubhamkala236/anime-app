import React from "react";
import { Button } from "./ui/button";

const Search = () => {
  return (
    <div className="search-bar z-[1] hidden md:flex md:absolute mt-32 justify-center items-center w-full h-[90%]">
      <div className="search w-1/2 mr-4">
        <input
          className="w-full py-3 px-1 border-black border-[1px] bg-white rounded-md text-black text-xl"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          autoCorrect="off"
        />
      </div>
      <Button className="bg-blue-500 font-semibold p-6 text-center text-xl">
        Search
      </Button>
    </div>
  );
};

export default Search;
