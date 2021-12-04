const { Sequelize } = require("sequelize");

// Database
const sequelize = new Sequelize(
    "postgres://postgres:postgres@localhost:5432/vavjs",
    {
        define: {
            timestamps: false,
            freezeTableName: true,
        },
    }
);

module.exports = { sequelize };
