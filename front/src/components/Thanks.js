import React, { useState, useEffect } from "react";

export default function Thanks(props) {
    const [imageLink, setimageLink] = useState("");
    const getAdd = () => {
        fetch("http://localhost:8080/img")
            .then((res) => res.json())
            .then((img) => {
                setimageLink(img.image);
            });
    };

    const imageOnClick = () => {
        fetch("http://localhost:8080/addCount", { method: "POST" });
    };

    useEffect(() => {
        getAdd();
    }, []);
    return (
        <div className="d-flex flex-column">
            <p className="h1">Thaaaanks</p>
            <img
                src={imageLink}
                className="m-5"
                style={{
                    maxWidth: "30rem",
                }}
                alt="Le add"
                onClick={imageOnClick}
            />
        </div>
    );
}
