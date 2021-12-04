const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const add = sequelize.define("add", {
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clickCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = add;
