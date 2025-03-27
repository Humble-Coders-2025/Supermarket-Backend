const sequelize = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { OrderStatus } = require("../config/enums");

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        products_snapshot: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        breakdown: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(Object.values(OrderStatus)),
            allowNull: false,
            defaultValue: OrderStatus.PENDING,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Order;
