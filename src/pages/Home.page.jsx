import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";

import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { AiFillCaretDown } from "react-icons/ai";

// let songs = [
//     ["Itachi Uchiha Theme", "Crescent Sun", song1Img, song1],
//     ["Pain's Theme", "Crescent Ferrara", song2Img, song2],
//     ["Calm Down", "Rema, Selena Gomez", song3Img, song3],
//     ["Blue Bird", "Akano", song4Img, song4],
//     ["Rockabye", "Clean Bandit, Anne Marie", song5Img, song5],
//     ["New Rules", "Dua Lipa", song6Img, song6],
//     ["Until I Found You", "Stephen Sanchez, Em Beihold", song7Img, song7],
//     ["No Lie", "Sean Paul, Dua Lipa", song8Img, song8],
//     ["Sorry", "Justin Bieber", song9Img, song9],
//     ["Havana", "Camila Cabello", song10Img, song10],
//     ["Closer", "Chainsmoker, Halsey", song11Img, song11],
//     ["Lean On", "Dj Snake, Major Lazer", song12Img, song12],
//     ["Cheap Thrills", "Sia, Sean Paul", song13Img, song13],
//     ["Shape Of You", "Ed Sheeran", song14Img, song14],
// ];

function Home() {
    let GlobalData = useContext(GlobalContext);
    let { songs, setSongs, setCurrentSongIndex } = GlobalData;

    function playSongHandler(e, currentSong, Index) {
        GlobalData.setCurrentSong(currentSong);
        setCurrentSongIndex(Index);
    }

    useEffect(function () {
        fetch("http://localhost:8080/api/allsongs")
            .then((responce) => responce.json())
            .then((responce) => {
                if (responce.data) {
                    setSongs([...responce.data]);
                }
            });
    }, []);

    return (
        // Home page main container
        <section className="w-screen m-0 pb-[120px] overflow-auto md:pb-[100px] bg-gradient-to-b from-zinc-800 to-zinc-900">
            {/* NAVIGATOR */}
            {/* USER SETTING | PREVIOUS BUTTON | NEXT BUTTON */}
            <div className="flex justify-between mx-1 my-2 md:mx-5 ">
                {/* LEFT SECTION */}
                <div className="flex gap-4 py-3">
                    <span className="p-2 rounded-full bg-neutral-900">
                        <SlArrowLeft className="text-base text-white" />
                    </span>
                    <span className="p-2 rounded-full bg-neutral-900">
                        <SlArrowRight className="text-base text-white" />
                    </span>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center justify-center ">
                    <span className="flex items-center justify-center gap-2 p-1 rounded-full bg-neutral-900">
                        <span className="p-1.5 bg-zinc-500 rounded-full">
                            <SlUser className="text-base text-white" />
                        </span>
                        <span className="font-semibold text-white ">
                            {localStorage.getItem("firstname")}
                        </span>
                        <span>
                            <AiFillCaretDown className="mt-1 text-base text-white" />
                        </span>
                    </span>
                </div>
            </div>

            {/* ALL SONG */}
            <div className="p-1 mx-1 my-2 md:mx-5">
                <h1 className="p-1 m-1 mb-5 text-xl font-bold text-white">
                    All Songs
                </h1>

                {/* SONG CONTAINER */}
                <div className="grid grid-cols-2 gap-5 p-1 m-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                    {songs.map((song, index) => {
                        return (
                            <div
                                key={index}
                                className="box-border p-4 rounded-md cursor-pointer bg-neutral-800 hover:bg-zinc-700 transition shadow-[0px_0px_10px_1px_rgba(20,20,20,0.3)] min-w-[120px]"
                                onClick={(e) => playSongHandler(e, song, index)}
                            >
                                <div className="pt-[100%] relative h-0 w-auto">
                                    <img
                                        src={
                                            "http://localhost:8080" +
                                            song.song_thumbnail_url
                                        }
                                        alt=""
                                        className="absolute top-0 rounded-md w-[100%] h-[100%] object-cover "
                                    />
                                </div>
                                <p className="my-2 mt-5 text-xs font-semibold text-white truncate md:text-base">
                                    {song.song_name}
                                </p>
                                <p className="mb-2 overflow-hidden text-xs font-semibold truncate md:text-sm text-zinc-500">
                                    {song.song_artist}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Home;
