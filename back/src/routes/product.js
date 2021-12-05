const product = require("../models/product");

const getProducts = async (req, res) => {
    const products = await product.findAll();
    res.send(products);
};

module.exports = { getProducts };
