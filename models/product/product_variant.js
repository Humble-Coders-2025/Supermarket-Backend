const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const ProductVariant = sequelize.define(
    "productVariant",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mrp: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
    },
    {
        underscored: true,
    }
);

module.exports = ProductVariant;
