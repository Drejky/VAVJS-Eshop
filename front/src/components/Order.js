import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Order(props) {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const orderThings = (data) => {
        fetch("http://localhost:8080/orderThings", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
        });
    };

    const onBuy = () => {
        let formJson = [
            {
                email: document.getElementById("emailIn").value,
                name: document.getElementById("nameIn").value,
                street: document.getElementById("streetIn").value,
                number: parseInt(document.getElementById("streetNumIn").value),
                city: document.getElementById("cityIn").value,
                psc: parseInt(document.getElementById("pscIn").value),
            },
            { price: total },
        ];
        formJson.push(...props.order);
        orderThings(formJson);
        props.setOrder([]);
        navigate("thanks");
    };

    const calcPrice = () => {
        let total = 0;
        for (let i in props.order) {
            total += props.order[i].price * props.order[i].bought;
        }
        setTotal(total);
    };

    useEffect(() => {
        calcPrice();
    }, []);

    return (
        <div className="d-flex flex-column me-5 ms-5">
            {props.order.map((product) => (
                <p className="h3" key={product.id}>{`${product.name} x ${
                    product.bought
                } ${product.price * product.bought}$`}</p>
            ))}
            <p className="h1 text-danger">Total price: {total}$</p>
            <label htmlFor="emailIn">
                Email:
                <input className="form-control" type="text" id="emailIn" />
            </label>
            <label>
                Name:
                <input className="form-control" type="text" id="nameIn" />
            </label>
            <label>
                Street name:
                <input className="form-control" type="text" id="streetIn" />
            </label>
            <label>
                Street number:
                <input className="form-control" type="text" id="streetNumIn" />
            </label>
            <label>
                City:
                <input className="form-control" type="text" id="cityIn" />
            </label>
            <label>
                PSC:
                <input className="form-control mb-3" type="text" id="pscIn" />
            </label>
            <button onClick={onBuy} className="btn btn-dark">
                Buy
            </button>
        </div>
    );
}
