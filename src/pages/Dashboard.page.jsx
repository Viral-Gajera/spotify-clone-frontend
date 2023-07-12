import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar.comp";
import MusicPlayer from "./components/MusicPlayer.comp";

function Dashboard() {
    return (
        <div className="flex w-screen h-[100vh] bg-secondary">
            <NavBar></NavBar>
            <Outlet />
            <MusicPlayer />
        </div>
    );
}

export default Dashboard;
