import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../App";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useAlert from "../hooks/useAlert.hook";

function YourLibrary() {
    let [songList, setSongList] = useState([]);
    let GlobalData = useContext(GlobalContext);

    let { ShowAlert } = useAlert();
    let [isLiked, setIsLiked] = useState(false);

    useEffect(function () {
        let email = localStorage.getItem("email");
        fetch("http://localhost:8080/api/playlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result.data);
                if (result) {
                    setSongList(result.data);
                }
            });
    }, []);

    function playSongHandler(e, currentSong, Index) {
        GlobalData.setCurrentSong(currentSong);
        GlobalData.setCurrentSongIndex(Index);
    }

    function likeUnlike() {
        if (isLiked) {
            let email = localStorage.getItem("email");
            let songId = GlobalData.currentSong.song_id;

            fetch("http://localhost:8080/api/unlikesong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    songId,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.isSuccess) {
                        setIsLiked(false);
                    } else {
                        ShowAlert(result.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    ShowAlert("Something went wrong");
                });
        } else {
            let email = localStorage.getItem("email");
            let songId = GlobalData.currentSong.song_id;

            fetch("http://localhost:8080/api/likesong", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    songId,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.isSuccess) {
                        setIsLiked(true);
                    } else {
                        ShowAlert(result.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    ShowAlert("Something went wrong");
                });
        }
    }

    return (
        <div className="items-center justify-center w-screen min-h-screen overflow-y-auto">
            <h1 className="m-5 text-xl font-bold text-white ">Your Library</h1>
            <div className="m-5">
                <div className="flex flex-col gap-5 p-1 px-5 m-1">
                    {songList.map((song, index) => {
                        return (
                            <div
                                key={index}
                                className="box-border p-4 rounded-md cursor-pointer bg-neutral-800 hover:bg-zinc-700 transition shadow-[0px_0px_10px_1px_rgba(20,20,20,0.3)] min-w-[120px] h-[80px] flex justify-between items-center gap-5  px-5"
                                onClick={(e) => playSongHandler(e, song, index)}
                            >
                                <div className=" relative h-[50px] w-[50px]">
                                    <img
                                        src={
                                            "http://localhost:8080" +
                                            song.song_thumbnail_url
                                        }
                                        alt=""
                                        className="absolute top-0 rounded-md w-[50px] h-[50px] object-cover "
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-right text-white truncate md:text-base">
                                        {song.song_name}
                                    </p>
                                    <p className="overflow-hidden text-xs font-semibold text-right truncate md:text-sm text-zinc-500">
                                        {song.song_artist}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default YourLibrary;
