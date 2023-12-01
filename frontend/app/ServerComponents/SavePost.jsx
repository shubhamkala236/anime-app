"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SavePost = ({ animeId, token }) => {
  let router = useRouter();
  const [Save, setSave] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let savedClick = async () => {
    //saved clicked
    console.log("Save Clicked");
    if (isLoggedIn === false) {
      router.push("/Login");
    }
    //if already logged in save post
    let mal_id = animeId;
    let saved_type = "Watch Later";
    const save = await fetch(`http://localhost:5000/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ mal_id, saved_type }),
    });

    let data = await save.json();
    console.log(data);
    if (data !== null) {
      setSave(!Save);
    }
  };

  //set unsave
  let unSavedClick = async () => {
    if (isLoggedIn === false) {
      router.push("/Login");
    }

    //if already logged in unsave post
    let mal_id = animeId;
    // let saved_type = "Watch Later"
    const unsave = await fetch(`http://localhost:5000/unSave`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ mal_id }),
    });

    let data = await unsave.json();
    console.log(data);
    if (data !== null) {
      setSave(!Save);
    }
  };

  //on save we call api to save our post
  useEffect(() => {
    if (token === null || token === undefined) {
      setIsLoggedIn(false);
    }

    setIsLoggedIn(true);

    const fetchSavedStatus = async () => {
      try {
        let res = await fetch(`http://localhost:5000/saveStatus/${animeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setSave(data.savedStatus);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching saved status:", error);
      }
    };
    fetchSavedStatus();
  }, [Save, isLoggedIn]);

  return (
    <div
      className="save-button cursor-pointer"
      onClick={() => {
        Save === true ? unSavedClick() : savedClick();
      }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
      />
      {Save ? (
        <i class="bi bi-bookmark-fill"></i>
      ) : (
        <i class="bi bi-bookmark"></i>
      )}
    </div>
  );
};

export default SavePost;
