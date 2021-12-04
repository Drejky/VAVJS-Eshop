import React from "react";
import Product from "./Product";

export default function OrderCard(props) {
    const size = {
        height: "auto",
        width: "20rem",
    };
    const priceSize = {
        fontSize: "2rem",
    };

    const payOrder = (id) => {
        fetch(`http://localhost:8080/orders/${id}`, { method: "POST" })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
        props.getStates();
    };

    return (
        <div className="card m-2 align-self-start" style={size} key={props.id}>
            <p>Purchased by {props.buyer.name}</p>
            {props.products.map((product) => (
                <ul key={product.id}>
                    {product.name} x {product.product_order.ammount}
                </ul>
            ))}
            <p>{props.state}</p>
            <p>{props.price} $</p>
            <button
                className="btn btn-dark"
                onClick={() => {
                    payOrder(props.id);
                }}
            >
                Pay
            </button>
        </div>
    );
}
