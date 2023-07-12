import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../App";

import LogoGreen from "./images/spotify-logo-green.png";
import { audio } from "./components/MusicPlayer.comp";

function Loading() {
    const navigate = useNavigate();

    let GlobalData = useContext(GlobalContext);
    GlobalData.setCurrentSong();
    audio.pause();

    useEffect(
        function () {
            setTimeout(function () {
                navigate("/login");
            }, 3 * 1000);
            window.scrollTo(0, 200);
        },
        [navigate]
    );

    return (
        <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-black">
            <img src={LogoGreen} alt="" className="w-[200px] md:w-[400px]" />
        </div>
    );
}

export default Loading;
