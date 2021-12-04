const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const buyer = sequelize.define("buyer", {
    // id, e-mail (unikatny), meno, ulica, cislo, mesto , psc
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    psc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

buyer.associate = (models) => {
    buyer.hasMany(models.order);
};

module.exports = buyer;
