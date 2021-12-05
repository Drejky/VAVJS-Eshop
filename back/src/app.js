const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const testo = require("./routes/testo");
const add = require("./routes/add");
const order = require("./routes/order");
const product = require("./routes/product");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/testo").get(testo.getTest);
app.route("/img").get(add.getImg).post(add.postImg);
app.route("/addCount").post(add.addCount);
app.route("/orders").get(order.getOrders);
app.route("/orders/:prID").post(order.payOrder);
app.route("/products").get(product.getProducts);
app.route("/orderThings").post(order.orderThings);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app };
