import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";

export default function Admin(props) {
    const [imageLink, setimageLink] = useState("");
    const [addCount, setaddCount] = useState("");
    const [orders, setOrders] = useState([]);
    const getStates = () => {
        fetch("http://localhost:8080/img")
            .then((res) => res.json())
            .then((img) => {
                setimageLink(img.image);
                setaddCount(img.clickCount);
            });
        fetch("http://localhost:8080/orders")
            .then((res) => res.json())
            .then((res) => {
                setOrders(res);
                console.log(res);
            });
    };
    useEffect(() => {
        getStates();
    }, []);

    const submitButton = () => {
        const newUrl = { image: document.getElementById("imgURLin").value };
        console.log(newUrl);
        fetch("http://localhost:8080/Img", {
            method: "POST",
            body: JSON.stringify(newUrl),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((img) => {
                console.log(img);
                setimageLink(img.image);
            });
    };

    return (
        <div className="d-flex flex-column">
            <p className="h1 text-danger">
                Ad has been clicked {addCount} times!!!
            </p>
            <label className="h5">
                Change IMG url:
                <input id="imgURLin" className="form-control mt-2 mb-2"></input>
                <button onClick={submitButton} className="btn btn-dark">
                    Submit
                </button>
            </label>
            <img
                src={imageLink}
                className="m-5"
                style={{
                    maxWidth: "20rem",
                }}
                alt="Le add"
            />
            <ul className="d-flex flex-col ">
                {orders.map((order) => (
                    <OrderCard
                        state={order.state}
                        price={order.price.toString()}
                        buyer={order.buyer}
                        products={order.products}
                        id={order.id}
                        key={order.id}
                        getStates={getStates}
                    ></OrderCard>
                ))}
            </ul>
        </div>
    );
}
