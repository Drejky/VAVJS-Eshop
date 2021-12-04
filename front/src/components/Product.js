import React from "react";

export default function Product(props) {
    const size = {
        height: "auto",
        width: "20rem",
    };
    const priceSize = {
        fontSize: "2rem",
    };

    const addToOrder = (id, name, price) => {
        let newOrder = [...props.order.order];
        for (let i in newOrder) {
            if (newOrder[i].id === id) {
                newOrder[i].bought += 1;
                props.order.setOrder(newOrder);
                console.log(props.order.order);
                return;
            }
        }
        newOrder.push({ id: id, bought: 1, name: name, price: price });

        props.order.setOrder(newOrder);
        console.log(props.order.order);
    };

    return (
        <div className="card m-2 align-self-start" style={size} key={props.id}>
            <img
                className="card-img-top rounded"
                style={size}
                src={props.image}
                alt="Product"
            ></img>
            <h4 className="card-title h1" style={size}>
                {props.name}
            </h4>
            <h1 className=" display-5" style={priceSize}>
                {props.price + "$"}
            </h1>
            <button
                onClick={() => {
                    addToOrder(props.id, props.name, props.price);
                }}
                className="btn btn-dark"
            >
                Add to cart
            </button>
        </div>
    );
}
