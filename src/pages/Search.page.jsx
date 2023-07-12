import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../App";

import { BiSearch } from "react-icons/bi";

function Search() {
    let GlobalData = useContext(GlobalContext);
    let [songList, setSongList] = useState([]);

    function searchHandler(e) {
        let searchValue = e.target.value;
        if (searchValue) {
            let filteredSongs = GlobalData.songs.filter((song) => {
                return song.song_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setSongList(filteredSongs);
        } else {
            setSongList(GlobalData.songs);
        }
    }

    function playSongHandler(e, currentSong, Index) {
        GlobalData.setCurrentSong(currentSong);
        GlobalData.setCurrentSongIndex(Index);
    }

    useEffect(() => {
        setSongList(GlobalData.songs);
    }, []);

    return (
        <div className="w-screen min-h-screen m-0 pb-[120px] overflow-auto md:pb-[100px] bg-gradient-to-b from-zinc-800 to-zinc-900">
            {/* SEARCH */}
            <div className="h-[70px] w-full sticky top-0 flex justify-center items-center z-10">
                <div className="mt-[10px] max-w-[500px] w-[90%] rounded-full bg-white overflow-hidden py-2 px-3">
                    <BiSearch className="inline-block" size={25} />
                    <input
                        type="search"
                        className="w-[80%] sm:w-[90%] ml-2 outline-0"
                        onKeyUp={searchHandler}
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 p-5 m-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {songList.map((song, index) => {
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
    );
}

export default Search;
