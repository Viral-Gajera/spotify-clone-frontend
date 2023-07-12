import { NavLink } from "react-router-dom";

function Verify() {
    return (
        <div className="flex flex-col items-center w-[100%]">
            <div className="flex gap-5 my-8 md:gap-8">
                <NavLink
                    to="/Verify"
                    className={`pb-[2px] px-[1px] text-sm  text-white border-b-2 active:border-white border-primary`}
                >
                    VERIFY
                </NavLink>
            </div>
            <div className="flex flex-col w-[80%] max-w-[300px]">
                <div className="pl-1 mb-1 text-white">OTP sent to your email address</div>
                <input
                    type="text"
                    className="py-1.5 px-4 rounded-full outline-none w-[100%] mb-7"
                    name=""
                    placeholder="Enter OTP"
                    id=""

                />
                <NavLink
                    to="/dashboard/home"
                    className="py-1.5 px-4 rounded-full bg-primary shadow-md text-white font-semibold shadow-gray-900 active:bg-green-600 text-center"
                >
                    {" "}
                    VERIFY{" "}
                </NavLink>
            </div>
        </div>
    );
}

export default Verify;
