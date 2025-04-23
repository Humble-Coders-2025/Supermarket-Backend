const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const ProductAttribute = sequelize.define(
    "productAttribute",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
    }
);

module.exports = ProductAttribute;
