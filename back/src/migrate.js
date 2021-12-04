const { sequelize } = require("./db");
const { DataTypes } = require("sequelize");
const product = require("./models/product");
const order = require("./models/order");
const buyer = require("./models/buyer");
const add = require("./models/add");

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
sequelize.drop();

sequelize.sync({ force: true }).then(() => {
    //Source: https://unsplash.com/photos/8l9VxXI28tY
    product.create({
        name: "Nugget",
        price: 30,
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
    });

    //Source: https://unsplash.com/photos/ogxlyCA1BQc
    product.create({
        name: "Arduino",
        price: 50,
        image: "https://images.unsplash.com/photo-1537151377170-9c19a791bbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    });
    //Source: https://unsplash.com/photos/_lSp15Z_4xk
    product.create({
        name: "Le camera",
        price: 1000,
        image: "https://images.unsplash.com/photo-1566863244489-a5e7946f46f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGVsZWN0cm9uaWNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    });

    //Source: https://unsplash.com/photos/_9dSF0Hwitw
    add.create({
        image: "https://images.unsplash.com/photo-1533069027836-fa937181a8ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        clickCount: 0,
    });
});
