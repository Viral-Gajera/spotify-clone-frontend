import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../../hooks/useAlert.hook";

import Icon from "../images/spotify-icon.png";

function AdminLogin() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let { ShowAlert } = useAlert();
    let navigate = useNavigate();

    function loginHandler() {
        let emailRegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+/g;
        let passwordRegExp = /[a-zA-z0-9]+/g;

        if (!(email.match(emailRegExp) && password.match(passwordRegExp))) {
            ShowAlert(
                "Please Enter Valid Email Address Or Password",
                "Re-Enter"
            );
            return "";
        }

        fetch("http://localhost:8080/api/validateadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.isSuccess == true) {
                    localStorage.setItem("adminToken", result.data.token);
                    window.addEventListener("beforeunload", function () {
                        localStorage.removeItem("adminToken");
                    });
                    navigate("/admin/upload");
                } else {
                    ShowAlert("Invalid Credentials");
                }
            })
            .catch((error) => {
                console.log(error);
                ShowAlert("Login Failed");
            });
    }

    return (
        <div className="h-auto border bg-white w-[90%] max-w-[500px] min-h-[400px] rounded-md pt-[50px] pb-[60px]">
            <div className="flex justify-center">
                <img src={Icon} className="w-[50px]" alt="" />
            </div>
            <div className="mt-[10px]">
                <h1 className="text-xl font-bold text-center">Admin Login</h1>
            </div>

            {/* EMAIL ADDRESS */}
            <div className="mx-auto max-w-[300px] mt-[20px] text-zinc-700">
                <label className="text-sm font-bold">Email Address</label>
                <input
                    type="text"
                    className="w-full py-1 border-b border-gray-300 outline-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mx-auto max-w-[300px] mt-[20px] text-zinc-700">
                <label className="text-sm font-bold">Password</label>
                <input
                    type="password"
                    className="w-full py-1 border-b border-gray-300 outline-0"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div
                className="mx-auto max-w-[300px] mt-[30px] bg-primary text-white font-bold p-2 text-center rounded-full hover:bg-green-500 active:bg-green-400"
                onClick={loginHandler}
            >
                Login
            </div>
        </div>
    );
}

export default AdminLogin;
