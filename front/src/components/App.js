import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "../components/Products.js";
import Welcome from "./Welcome.js";
import Admin from "./Admin.js";
import Order from "./Order.js";
import Thanks from "./Thanks.js";

export default function App() {
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        fetch("http://localhost:8080/products", {
            mode: "cors",
        })
            .then((res) => res.json())
            .then((products) => {
                setProducts(products);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li>
                        <Link to={"/"} className="nav-link">
                            {" "}
                            Home{" "}
                        </Link>
                    </li>
                    <li>
                        <Link to={"/shop"} className="nav-link">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to={"/admin"} className="nav-link">
                            Admin
                        </Link>
                    </li>
                    <li>
                        <Link to={"/order"} className="nav-link">
                            Shoping cat
                        </Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route exact path="/" element={<Welcome />}></Route>
                <Route
                    path="shop"
                    element={
                        <Products
                            order={order}
                            setOrder={setOrder}
                            products={products}
                            setProducts={setProducts}
                        />
                    }
                ></Route>
                <Route path="admin" element={<Admin />}></Route>
                <Route
                    path="order"
                    element={
                        <Order
                            order={order}
                            setOrder={setOrder}
                            products={products}
                            setProducts={setProducts}
                        />
                    }
                ></Route>
                <Route
                    path="order/thanks"
                    element={
                        <Thanks
                            order={order}
                            setOrder={setOrder}
                            products={products}
                            setProducts={setProducts}
                        />
                    }
                ></Route>
            </Routes>
        </Router>
    );
}
