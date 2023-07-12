import { useEffect } from "react";
import { NavLink, Outlet,  } from "react-router-dom";
import LogoGreen from "./images/spotify-logo.png";

function AuthWrapper() {
    
    useEffect(function(){
        window.scrollTo(0, 200);
    });
    return (

        // ENTIRE MAIN SCREEN
        <div className="flex items-center justify-center w-[100vw] min-h-screen bg-black">

            {/* GRAY BOX INSIDE MAIN SCREEN */}
            <div className="bg-secondary w-[90%] max-w-[500px] rounded-md shadow shadow-gray-700 h-auto py-10 flex justify-center items-center flex-col">
                {/* LOGO */}
                <div className="">
                    <NavLink to="/" >
                        <img src={LogoGreen} alt="" className="w-[120px]" />
                    </NavLink>
                </div>

                {/* CONTAINER FOR LOGIN | SIGN UP | VERIFY */}
                <div className="flex items-center justify-center w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;
