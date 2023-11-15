import React from "react";
import AnimeCard from "./AnimeCard";

const getAnimes = async () => {
  let data = await fetch("https://api.jikan.moe/v4/anime?limit=24");
  data = await data.json();
  return data.data;
};

const List = async () => {
  let animeList = await getAnimes();
  return (
    <div className="list mt-16 flex justify-between flex-wrap">
      {animeList.map((anime) => (
        <AnimeCard key={anime?.title} anime={anime} />
      ))}
    </div>
  );
};

export default List;
