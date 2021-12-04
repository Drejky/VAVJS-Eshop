const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const product = sequelize.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = product;
