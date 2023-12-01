"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Search = ({ getSearchData }) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [bgCover, setBgCover] = useState(false);

  const handleChange = async (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);

    // Fetch and update suggestions based on the input value
    const suggestionData = await getSearchData(inputValue);
    setSuggestions(suggestionData);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the input value to the clicked suggestion
    // console.log(suggestion);
    setValue(suggestion.title);
    // Clear the suggestions
    setSuggestions([]);
    //when click on sugestion is focused is set to false on blur but we are delaying it here
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className="search-bar z-[1] hidden md:flex md:absolute mt-32 justify-center items-center w-full h-[90%]">
      {bgCover && (
        <div
          onClick={() => {
            setBgCover(false);
            setIsFocused(false);
          }}
          className="bg-black h-screen w-screen absolute opacity-50 z-10"
        />
      )}
      <div className="search w-1/2 mr-4 z-30 relative">
        <input
          className="w-full py-3 px-3 border-black border-[1px] bg-white rounded-md text-black text-lg
          font-semibold
          text-ellipsis
          tracking-wider"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          autoCorrect="off"
          autoComplete="off"
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            setBgCover(true);
          }}
        />
        {isFocused && (
          <div className="drop-down bg-white p-1 overflow-hidden flex flex-col flex-1 w-full whitespace-nowrap absolute rounded-md">
            {suggestions?.slice(0, 15).map((suggestion) => (
              <Link
                className="text-lg text-black font-semibold text-ellipsis hover:bg-purple-300 block overflow-hidden transition-all rounded-md tracking-wider px-1"
                href={`Details/${suggestion.mal_id}`}
                key={suggestion.mal_id}
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setIsFocused(false);
                }}
              >
                {suggestion.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
