import React from "react";
import AnimeCard from "./AnimeCard";


//CLIENT COMPONENT
const List = ({animeList}) => {
  return (
    <div className="list mt-16 flex justify-between flex-wrap">
      {animeList?.map((anime) => (
        <AnimeCard key={anime?.title} anime={anime} />
      ))}
    </div>
  );
};

export default List;
