import Character from "@/components/Character";
import SavePost from "@/app/ServerComponents/SavePost";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { cookies } from 'next/headers'
import React from "react";



const getCharacters = async (id) => {
  var characters = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/characters`
  );
  characters = await characters.json();

  return characters.data;
};

const getAnimeDetails = async (id) => {
  var details = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  details = await details.json();
  return details.data;
};

const page = async ({ params }) => {
  var characters = await getCharacters(params?.id);
  var animeDetails = await getAnimeDetails(params?.id);
  var trailer_url = animeDetails?.trailer?.embed_url;
  var fall_back_image = animeDetails?.images?.jpg.large_image_url;
  var synopsis = animeDetails?.synopsis;
  const cookieStore = cookies()
  const token = cookieStore?.get('token')?.value;


  return (
    <div className="details-container m-4 bg-transparent flex justify-between">
      {/* Left scroll container -------------------------------------------------- */}
      <div className="left-bar h-[97vh] justify-center m-4">
        {characters?.length > 0 && (
          <div className="tracking-widest font-semibold text-xl text-center">
            CHARACTERS 
          </div>
        )}

        {characters?.length > 0 && (
          <ScrollArea className="h-full w-full rounded-md border">
            {characters.map((character) => (
              <Character
                key={character.character?.name}
                character={character}
              />
            ))}
          </ScrollArea>
        )}
      </div>

      {/* Trailer and details container -------------------------------------------------- */}
      <div className="trailer h-full w-full m-10">
        {trailer_url ? (
          <iframe class="w-full aspect-video" src={trailer_url}></iframe>
        ) : (
          <div className="fallback-Image aspect-video relative">
            <Image
              className="object-contain"
              src={fall_back_image}
              fill={true}
              alt="image_fallback"
            />
          </div>
        )}
        <div className="synopsis flex flex-col p-2 mt-10">
          <div className="title tracking-widest text-2xl font-semibold">
            <span className="flex justify-between">
              <div className="text-purple-600">SYNOPSIS</div>
              <SavePost animeId={params?.id} token={token}/>
            </span>
            <div>{animeDetails?.score}</div>
          </div>
          <div className="description tracking-wider">{synopsis}</div>
        </div>
        <div className="information flex flex-col p-2 tracking-wider text-md">
          <div className="type">
            <span className="text-red-500">Type:</span> {animeDetails?.type}
          </div>
          <div className="episode">
            <span className="text-red-500">Episodes:</span>{" "}
            {animeDetails?.episodes}
          </div>
          <div className="status">
            <span className="text-red-500">Status:</span> {animeDetails?.status}
          </div>
          <div className="studios">
            <span className="text-red-500">Studios:</span>{" "}
            {animeDetails?.studios[0]?.name}
          </div>
          <div className="source">
            <span className="text-red-500">Source:</span> {animeDetails?.source}
          </div>
          <div className="duration">
            <span className="text-red-500">Duration:</span>{" "}
            {animeDetails?.duration}
          </div>
          <div className="rating">
            <span className="text-red-500">Rating:</span> {animeDetails?.rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
