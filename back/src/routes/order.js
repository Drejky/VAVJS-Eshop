const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");
const order = require("../models/order");
const product = require("../models/product");
const buyer = require("../models/buyer");
//Relations
const product_order = sequelize.define(
    "product_order",
    {
        ammount: DataTypes.INTEGER,
    },
    { timestamps: false }
);
product.belongsToMany(order, { through: product_order, onDelete: "cascade" });
order.belongsToMany(product, { through: product_order, onDelete: "cascade" });
buyer.hasMany(order, { onDelete: "cascade" });
order.belongsTo(buyer, { onDelete: "cascade" });

const getOrders = async (req, res) => {
    try {
        const currOrder = await order.findAll({
            include: [buyer, product],
        });
        res.send(currOrder);
    } catch (err) {
        console.log(err);
    }
};
const payOrder = async (req, res) => {
    const currOrder = await order.findOne({
        where: {
            id: req.params.prID,
        },
    });

    currOrder.set({
        state: "paid",
    });
    await currOrder.save();
    //Add code to change state of order
    res.send(currOrder);
};

const orderThings = async (req, res) => {
    //First check if email already belongs to someone
    //Because there is no login system and email field must be unique
    //I decided to always write the newest order user information down
    let currBuyer = await buyer.findOne({
        where: { email: req.body[0].email },
    });
    //Scenario where user ordered before
    if (currBuyer) {
        currBuyer.set(req.body[0]); //Index 0 is always user
        await currBuyer.save();
    }
    //New user
    else {
        currBuyer = await buyer.create(req.body[0]);
    }

    //Now create order
    const currOrder = await order.create({
        state: "Unpaid",
        price: req.body[1].price,
    });

    //Now we define the relations
    //All products are listed beyond index 1
    currOrder.setBuyer(currBuyer);
    for (let i = 2; i < req.body.length; i += 1) {
        let tempProduct = await product.findOne({
            where: { id: req.body[i].id },
        });
        await currOrder.addProduct(tempProduct, {
            through: { ammount: req.body[i].bought },
        });
    }

    res.sendStatus(200);
};

module.exports = { getOrders, payOrder, orderThings };
