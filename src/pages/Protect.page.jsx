import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/Loader.comp";

function Protect(props) {
    let [Component, setComponent] = useState(Loader);
    let nativate = useNavigate();

    useEffect(function () {
        if (localStorage.getItem("token")) {
            fetch("http://localhost:8080/api/validatetoken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.isSuccess == true) {
                        setComponent(props.Component);
                    } else {
                        localStorage.removeItem("firstname");
                        localStorage.removeItem("token");
                        nativate("/login");
                    }
                })
                .catch((error) => {
                    localStorage.removeItem("firstname");
                    localStorage.removeItem("token");
                    nativate("/login");
                });
        } else {
            localStorage.removeItem("firstname");
            localStorage.removeItem("token");
            nativate("/login");
        }
    }, []);

    return <>{Component}</>;
}

export default Protect;
