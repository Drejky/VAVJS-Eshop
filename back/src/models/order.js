const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const order = sequelize.define("order", {
    state: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = order;
