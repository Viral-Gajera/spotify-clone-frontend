import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAlert from "../../hooks/useAlert.hook";

function SignUp() {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [termsAndConditions, setTermsAndConditions] = useState(false);

    let navigate = useNavigate();
    let { ShowAlert } = useAlert();

    function signUpHandler() {
        let firstNameRegExp = /[a-zA-Z]/;
        let lastNameRegExp = /[a-zA-Z]/;
        let emailRegExp = /[a-zA-Z0-9\.-]{3,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]+/;
        let passwordRegExp = /[a-zA-z0-9]+/g;

        if (
            !(
                firstName.match(firstNameRegExp) &&
                lastName.match(lastNameRegExp) &&
                email.match(emailRegExp) &&
                password.match(passwordRegExp)
            )
        ) {
            ShowAlert("Please Enter Valid Input", "Re-Enter");
            return "";
        }

        if (!termsAndConditions) {
            ShowAlert("Please Accept Terms And Conditions", "Re-Enter");
            return "";
        }

        fetch("http://localhost:8080/api/createaccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.isSuccess) {
                    localStorage.setItem("firstname", result.data.firstname);
                    localStorage.setItem("token", result.data.token);
                    ShowAlert("Account Created Successfully...", "Continue");
                    navigate("/dashboard/home");
                } else {
                    ShowAlert(result.message ?? "Login Failed");
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
                    className={`pb-[2px] px-[1px] text-sm  text-white border-b-2 active:border-white border-transparent `}
                >
                    LOGIN
                </NavLink>
                <NavLink
                    to="/signup"
                    className={`pb-[2px] px-[1px] text-sm  text-white border-b-2 active:border-white border-primary`}
                >
                    SIGN UP
                </NavLink>
            </div>
            <div className="flex flex-col gap-5 w-[80%] max-w-[300px]">
                <input
                    type="text"
                    className="py-1.5 px-4 rounded-full outline-none w-[100%]"
                    name=""
                    placeholder="First Name"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className="py-1.5 px-4 rounded-full outline-none w-[100%]"
                    name=""
                    placeholder="Last Name"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className="py-1.5 px-4 rounded-full outline-none w-[100%]"
                    name=""
                    placeholder="Email Address"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    className="py-1.5 px-4 rounded-full outline-none"
                    name=""
                    placeholder="Create Password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className="flex gap-2 pl-4">
                    {" "}
                    <input
                        type="checkbox"
                        name=""
                        id="signed-in"
                        onChange={(e) =>
                            setTermsAndConditions(e.target.checked)
                        }
                    />
                    <label htmlFor="signed-in" className="text-white">
                        Accept terms and conditions
                    </label>
                </div>
                <NavLink
                    onClick={signUpHandler}
                    className="py-1.5 px-4 rounded-full bg-primary shadow-md text-white font-semibold shadow-gray-900 active:bg-green-600 text-center"
                >
                    {" "}
                    CREATE ACCOUNT{" "}
                </NavLink>
            </div>
        </div>
    );
}

export default SignUp;
