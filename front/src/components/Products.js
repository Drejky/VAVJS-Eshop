import React from "react";
import Product from "./Product.js";
export default function Products(props) {
    return (
        <ul className="d-flex flex-wrap justify-content-center">
            {props.products.map((product) => (
                <Product
                    name={product.name}
                    image={product.image}
                    price={product.price.toString()}
                    id={product.id}
                    key={product.id}
                    order={props}
                ></Product>
            ))}
        </ul>
    );
}
