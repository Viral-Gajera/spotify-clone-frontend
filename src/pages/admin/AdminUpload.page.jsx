import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../../hooks/useAlert.hook";

import Icon from "../images/spotify-icon.png";

function AdminUpload() {
    let [songName, setSongName] = useState("");
    let [artistName, setArtistName] = useState("");
    let [songThumbnail, setSongThumbnail] = useState();
    let [songFile, setSongFile] = useState();

    let songThumbnailRef = useRef();
    let songFileRef = useRef();

    let { ShowAlert } = useAlert();
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/admin/login");
        } else {
            let adminToken = localStorage.getItem("adminToken");
            fetch("http://localhost:8080/api/validate-admin-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: adminToken,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    if (!result.isSuccess) {
                        navigate("/admin/login");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/admin/login");
                });
        }
    }, []);

    function uploadHandler() {
        let songNameRegExp = /^[a-zA-Z0-9',\s]{3,60}$/;
        let artistNameRegExp = /^[a-zA-Z0-9,\s]{3,60}$/;

        if (
            !(
                songName.match(songNameRegExp) &&
                artistName.match(artistNameRegExp) &&
                songThumbnail &&
                songFile
            )
        ) {
            ShowAlert("Invalid Details", "Re-Enter");
            return "";
        }

        let formData1 = new FormData();
        formData1.append("songName", songName);
        formData1.append("artistName", artistName);
        formData1.append("songThumbnail", songThumbnail);
        formData1.append("songFile", songFile);

        fetch("http://localhost:8080/api/upload-song", {
            method: "POST",
            body: formData1,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.isSuccess == true) {
                    ShowAlert(`${result.message}`, "OK");
                    setSongName("");
                    setArtistName("");
                    songThumbnailRef.current.value = "";
                    songFileRef.current.value = "";
                } else {
                    ShowAlert(`${result.message}`, "Re-Enter");
                }
            });
    }

    return (
        <div className="flex items-center justify-center w-screen min-h-screen bg-secondary">
            <div className="h-auto border bg-white w-[90%] max-w-[500px] min-h-[400px] rounded-md pt-[50px] pb-[60px]">
                <div className="flex justify-center">
                    <img src={Icon} className="w-[50px]" alt="" />
                </div>
                <div className="mt-[10px]">
                    <h1 className="text-xl font-bold text-center">
                        Upload Song Details
                    </h1>
                </div>

                {/* SONG NAME */}
                <div className="mx-auto max-w-[300px] mt-[20px] text-zinc-700">
                    <label className="text-sm font-bold">Song Name</label>
                    <input
                        type="text"
                        className="w-full py-1 border-b border-gray-300 outline-0"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                </div>
                <div className="mx-auto max-w-[300px] mt-[20px] text-zinc-700">
                    <label className="text-sm font-bold">Artist Name</label>
                    <input
                        type="text"
                        className="w-full py-1 border-b border-gray-300 outline-0"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                </div>
                <div className="mx-auto max-w-[300px] mt-[20px] text-zinc-700">
                    <label className="text-sm font-bold">Song Thumbnail</label>
                    <input
                        type="file"
                        className="w-full py-2 border-b border-gray-300 outline-0"
                        accept=".jpg"
                        onChange={(e) => setSongThumbnail(e.target.files[0])}
                        ref={songThumbnailRef}
                    />
                </div>
                <div className="mx-auto max-w-[300px] mt-[20px] text-zinc-700">
                    <label className="text-sm font-bold">Song Thumbnail</label>
                    <input
                        type="file"
                        className="w-full py-2 border-b border-gray-300 outline-0"
                        accept=".mp3"
                        onChange={(e) => setSongFile(e.target.files[0])}
                        ref={songFileRef}
                    />
                </div>
                <div
                    className="mx-auto max-w-[300px] mt-[30px] bg-primary text-white font-bold p-2 text-center rounded-full hover:bg-green-500 active:bg-green-400"
                    onClick={uploadHandler}
                >
                    Upload
                </div>
            </div>
        </div>
    );
}

export default AdminUpload;
