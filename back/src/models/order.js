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

order.associate = (models) => {
    order.belongsTo(models.buyer);
};

module.exports = order;
