import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAlert from "../../hooks/useAlert.hook";

function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [stayLoggedIn, setStayLoggedIn] = useState(false);

    let navigate = useNavigate();
    let { ShowAlert } = useAlert();

    useEffect(
        function () {
            if (localStorage.getItem("token")) {
                navigate("/dashboard/home");
            }
        },
        [navigate]
    );

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

        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.isSuccess == true) {
                    localStorage.setItem("firstname", result.data.firstname);
                    localStorage.setItem("email", result.data.email);
                    localStorage.setItem("token", result.data.token);
                    if (stayLoggedIn) {
                    } else {
                        window.addEventListener("beforeunload", function () {
                            localStorage.removeItem("firstname");
                            localStorage.removeItem("token");
                        });
                    }
                    navigate("/dashboard/home");
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
        <div className="flex flex-col items-center w-[100%]">
            <div className="flex gap-5 my-8 md:gap-8">
                <NavLink
                    to="/login"
                    className={`pb-[2px] px-[1px] text-sm  text-white border-b-2 active:border-white border-primary`}
                >
                    LOGIN
                </NavLink>
                <NavLink
                    to="/signup"
                    className={`pb-[2px] px-[1px] text-sm  text-white border-b-2 active:border-white border-transparent`}
                >
                    SIGN UP
                </NavLink>
            </div>
            <div className="flex flex-col gap-7 w-[80%] max-w-[300px]">
                <input
                    type="email"
                    className="py-1.5 px-4 rounded-full outline-none w-[100%]"
                    name=""
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="py-1.5 px-4 rounded-full outline-none"
                    name=""
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex gap-2 pl-4">
                    {" "}
                    <input
                        type="checkbox"
                        name=""
                        id="signed-in"
                        onChange={(e) => setStayLoggedIn(e.target.checked)}
                    />
                    <label htmlFor="signed-in" className="text-white">
                        Stay signed in
                    </label>
                </div>
                <NavLink
                    onClick={loginHandler}
                    className="py-1.5 px-4 rounded-full bg-primary shadow-md text-white font-semibold shadow-gray-900 active:bg-green-600 text-center"
                >
                    {" "}
                    LOGIN{" "}
                </NavLink>
            </div>
        </div>
    );
}

export default Login;
