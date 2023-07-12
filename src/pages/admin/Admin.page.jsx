import { Outlet } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

function Admin(){
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-secondary" >

            <div className="w-[100px] h-[100px] absolute top-0 right-0 flex justify-center items-center" >
                <NavLink to="/" className="p-2 bg-white rounded-full" >
                    <RxCross2></RxCross2>
                </NavLink>
            </div>
            
            <Outlet />
        </div>
    )
}

export default Admin;