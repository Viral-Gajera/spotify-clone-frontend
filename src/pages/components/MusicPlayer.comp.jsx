import { BiSkipNext, BiSkipPrevious, BiPlay, BiPause } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState, useRef, useContext, useEffect } from "react";
import { GlobalContext } from "../../App.js";
import useAlert from "../../hooks/useAlert.hook";

Audio.prototype.currentTimePercentage = function () {
    return (this.currentTime * 100) / this.duration || 0;
};
Audio.prototype.currentTimeRounded = function () {
    return Math.round(this.currentTime || 0);
};
Audio.prototype.currentTimeFormated = function () {
    let second = Math.round(this.currentTime || 0);

    let hour = Math.floor(second / 3600);
    let min = Math.floor(second / 60);
    let sec = second % 60;

    hour = hour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    min = min.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    sec = sec.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });

    if (hour === "00") {
        return `${min}:${sec}`;
    } else {
        return `${hour}:${min}:${sec}`;
    }
};
Audio.prototype.durationRounded = function () {
    return Math.round(this.duration || 0);
};
Audio.prototype.durationFormated = function () {
    let second = Math.round(this.duration || 0);

    let hour = Math.floor(second / 3600);
    let min = Math.floor(second / 60);
    let sec = second % 60;

    hour = hour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    min = min.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    sec = sec.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });

    if (hour === "00") {
        return `${min}:${sec}`;
    } else {
        return `${hour}:${min}:${sec}`;
    }
};

let audio = new Audio();

function MusicPlayer() {
    let {
        currentSong,
        currentSongIndex,
        songs,
        setCurrentSongIndex,
        setCurrentSong,
    } = useContext(GlobalContext);

    let GlobalData = useContext(GlobalContext);

    let interval;
    let sliderRef = useRef();
    let mobileSliderRef = useRef();
    let { ShowAlert } = useAlert();

    [audio] = useState(new Audio());
    let [currentTime, setCurrentTime] = useState(audio.currentTimeRounded());
    let [isPlaying, setIsPlaying] = useState(false);
    let [isLiked, setIsLiked] = useState(false);

    useEffect(
        function () {
            if (currentSong) {
                audio.src = "http://localhost:8080" + currentSong.song_file_url;
                audio.currentTime = 0;
                playPause();
            }
        },
        [currentSong]
    );

    useEffect(
        function () {
            let email = localStorage.getItem("email");
            let songId;

            if (GlobalData.currentSong) {
                songId = GlobalData.currentSong.song_id;

                fetch("http://localhost:8080/api/islikedsong", {
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
                        if (result.isSuccess) {
                            setIsLiked(true);
                        } else {
                            setIsLiked(false);
                        }
                    })
                    .catch((error) => {
                        setIsLiked(false);
                    });
            }
        },
        [GlobalData.currentSong]
    );
    function playPause() {
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
            interval = setInterval(function () {
                setCurrentTime(audio.currentTimeRounded());
                if (sliderRef.current) {
                    sliderRef.current.style.backgroundSize = `${audio.currentTimePercentage()}% 100%`;
                }
                if (mobileSliderRef.current) {
                    mobileSliderRef.current.style.width = `${audio.currentTimePercentage()}%`;
                }
            }, 1000);
        } else {
            audio.pause();
            setIsPlaying(false);
            clearInterval(interval);
        }
    }
    function previous() {
        if (songs[currentSongIndex - 1]) {
            setCurrentSong(songs[currentSongIndex - 1]);
            setCurrentSongIndex(currentSongIndex - 1);
        }
    }
    function next() {
        if (songs[currentSongIndex + 1]) {
            setCurrentSong(songs[currentSongIndex + 1]);
            setCurrentSongIndex(currentSongIndex + 1);
        }
    }
    audio.addEventListener("ended", function () {
        setIsPlaying(false);
        setCurrentTime(0);
        clearInterval(interval);
        audio.currentTime = 0;
        sliderRef.current.style.backgroundSize = `0% 100%`;
        mobileSliderRef.current.style.width = `${0}%`;
    });

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
        <>
            {currentSong ? (
                <>
                    {/* DESKTOP */}
                    <section className="absolute bottom-0 z-20 hidden w-full md:block">
                        <div className=" w-full text-white border-t border-zinc-800 h-[100px] bg-neutral-900 border grid grid-cols-4">
                            {/* SONG DETAILS */}
                            <div className="flex items-center justify-between m-1 grow">
                                <div className="flex items-center justify-start m-1 grow">
                                    <div className="relative h-[60px] w-[60px] ml-[20px]">
                                        <img
                                            src={
                                                "http://localhost:8080" +
                                                currentSong.song_thumbnail_url
                                            }
                                            alt=""
                                            className="absolute top-0 rounded-md w-[100%] h-[100%] object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-[15px]">
                                        <span className="text-base font-bold text-white">
                                            {currentSong[1]}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            {currentSong[2]}
                                        </span>
                                    </div>
                                </div>

                                <div className="" onClick={likeUnlike}>
                                    {isLiked ? (
                                        <AiFillHeart
                                            className="text-primary"
                                            size={25}
                                        ></AiFillHeart>
                                    ) : (
                                        <AiOutlineHeart
                                            className=""
                                            size={25}
                                        ></AiOutlineHeart>
                                    )}
                                </div>
                            </div>

                            {/* SLIDER | PLAY | PAUSE MAIN CONTAINER */}
                            <div className="m-1  grow-[2] flex items-center justify-center  flex-col col-span-2">
                                {/* UPPER */}
                                <div className="flex items-center justify-center gap-2">
                                    {/* PREVIOUS */}
                                    <BiSkipPrevious
                                        className="text-[2vw]"
                                        onClick={previous}
                                    />

                                    {/* PLAY | PAUSE */}
                                    <div
                                        className="box-border bg-white rounded-full"
                                        onClick={playPause}
                                    >
                                        {isPlaying ? (
                                            <BiPause className="text-[2vw] text-black" />
                                        ) : (
                                            <BiPlay className="text-[2vw] text-black pl-1" />
                                        )}
                                    </div>

                                    <BiSkipNext
                                        className="text-[2vw]"
                                        onClick={next}
                                    />
                                </div>

                                {/* LOWER */}
                                <div className="flex items-center gap-3 w-[80%] mt-2">
                                    {/* CURRENT TIME */}
                                    <div className="pt-1.5 text-xs">
                                        {audio.currentTimeFormated()}
                                    </div>

                                    {/* SLIDER */}
                                    <div className=" w-[100%]">
                                        <input
                                            ref={sliderRef}
                                            type="range"
                                            className="custom-range-input"
                                            min={0}
                                            max={audio.durationRounded()}
                                            step={1} // 1 second
                                            value={currentTime}
                                            onInput={function (e) {
                                                setCurrentTime(e.target.value);
                                                audio.currentTime =
                                                    e.target.value;
                                                e.target.style.backgroundSize = `${audio.currentTimePercentage()}% 100%`;
                                            }}
                                        />
                                    </div>

                                    {/* TOTAL TIME */}
                                    <div className="pt-1.5 text-xs">
                                        {audio.durationFormated()}
                                    </div>
                                </div>
                            </div>

                            {/* VOLUMN LEVEL */}
                            <div className="m-1 grow">
                                <div className="w-[150px]"></div>
                            </div>
                        </div>
                    </section>

                    {/* MOBILE */}
                    <section className="fixed bottom-[60px] z-40 block w-full md:hidden">
                        <div className="h-[60px] bg-black my-[2px] mx-[7px] rounded-lg flex flex-col justify-center overflow-hidden relative">
                            {/* SONG DETAILS */}
                            <div className="flex justify-between">
                                <div className="flex items-center justify-center p-1">
                                    <div className="relative h-[40px] w-[40px] ml-[5px]">
                                        <img
                                            src={
                                                "http://localhost:8080" +
                                                currentSong.song_thumbnail_url
                                            }
                                            alt=""
                                            className="absolute top-0 rounded-md w-[100%] h-[100%] object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-[7px]">
                                        <span className="text-xs font-bold text-white">
                                            {currentSong[1]}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            {currentSong[2]}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-center mr-[10px]"
                                    onClick={playPause}
                                >
                                    {isPlaying ? (
                                        <BiPause className="text-[40px] text-white" />
                                    ) : (
                                        <BiPlay className="text-[40px] text-white pl-1" />
                                    )}
                                </div>
                            </div>

                            {/* SLIDER */}
                            <div className="absolute bottom-0 bg-transparent z-[50] w-[100%]">
                                <div
                                    className="bg-white h-[2px] w-[0px]"
                                    ref={mobileSliderRef}
                                ></div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default MusicPlayer;
export { audio };
