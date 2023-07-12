import { NavLink, useLocation } from "react-router-dom";
import SpotifyLogoWhite from "../images/spotify-logo-white.png";

import { FiSearch } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import {HiOutlineUpload} from "react-icons/hi";

// NEVIGATION BAR FOR SCREEN > 768px
function DesktopNavBar() {
    let location = useLocation();
    return (
        <div className=" bg-black w-[300px] h-screen text-white">
            <div className="p-5 ">
                <img src={SpotifyLogoWhite} className="w-[150px]" alt="" />
            </div>
            <div className="flex flex-col gap-5 p-5 ">
                <NavLink
                    to="/dashboard/home"
                    className={`flex items-center gap-[20px] active:scale-[99%]  ${
                        location.pathname === "/dashboard/home"
                            ? "text-white"
                            : "text-gray-400"
                    }`}
                >
                    <AiFillHome className="text-[25px] " />
                    <span className="text-base">Home</span>
                </NavLink>
                <NavLink
                    to="/dashboard/search"
                    className={`flex items-center gap-[20px] active:scale-[99%]  ${
                        location.pathname === "/dashboard/search"
                            ? "text-white"
                            : "text-gray-400"
                    }`}
                >
                    <FiSearch className="text-[25px] " />
                    <span className="text-base">Search</span>
                </NavLink>
                <NavLink
                    to="/dashboard/yourlibrary"
                    className={`flex items-center gap-[20px] active:scale-[99%]  ${
                        location.pathname === "/dashboard/yourlibrary"
                            ? "text-white"
                            : "text-gray-400"
                    }`}
                >
                    <VscLibrary className="text-[25px] " />
                    <span className="text-base">Your Library</span>
                </NavLink>
                <NavLink
                    to="/admin/login"
                    className={`flex items-center gap-[20px] active:scale-[99%] text-gray-400`}
                >
                    <HiOutlineUpload className="text-[25px] " />
                    <span className="text-base">Upload Song</span>
                </NavLink>
            </div>
        </div>
    );
}

// NEVIGATION BAR FOR SCREEN < 768px
function MobileNavBar() {
    let location = useLocation();
    return (
        <div className="  bg-[rgba(0,0,0,1)] text-gray-400 h-[60px] flex justify-around items-center">
            <NavLink
                to="/dashboard/home"
                className={`flex flex-col items-center gap-[1px] active:scale-90 px-5 transition ${
                    location.pathname === "/dashboard/home" ? "text-white" : ""
                }`}
            >
                <AiFillHome className="text-[25px] " />
                <span className="text-[0.6rem]">Home</span>
            </NavLink>
            <NavLink
                to="/dashboard/search"
                className={`flex flex-col items-center gap-[1px] active:scale-90 px-5 transition ${
                    location.pathname === "/dashboard/search"
                        ? "text-white"
                        : ""
                }`}
            >
                <FiSearch className="text-[25px] " />
                <span className="text-[0.6rem]">Search</span>
            </NavLink>
            <NavLink
                to="/dashboard/yourlibrary"
                className={`flex flex-col items-center gap-[1px] active:scale-90 px-5 transition ${
                    location.pathname === "/dashboard/yourlibrary"
                        ? "text-white"
                        : ""
                }`}
            >
                <VscLibrary className="text-[25px] " />
                <span className="text-[0.6rem]">Your Library</span>
            </NavLink>
        </div>
    );
}

// BASE NAVIGATION BAR
function NavBar() {
    return (
        <>
            {/* MOBILE NAVBAR */}
            <div className="fixed bottom-0 z-10 block w-full md:hidden">
                <MobileNavBar />
            </div>

            {/* DESKTOP NAVBAR */}
            <div className="hidden md:block">
                <DesktopNavBar />
            </div>
        </>
    );
}

export default NavBar;
