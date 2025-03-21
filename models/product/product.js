const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const GenericProduct = sequelize.define(
    "generic_product",
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
        description: {
            type: DataTypes.TEXT,
        },
        manufacturer: {
            type: DataTypes.STRING,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = GenericProduct;
