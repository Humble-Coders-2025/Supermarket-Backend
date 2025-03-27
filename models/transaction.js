const sequelize = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { TransactionStatus } = require("../config/enums");

const Transaction = sequelize.define(
    "transaction",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(Object.values(TransactionStatus)),
            allowNull: false,
            defaultValue: TransactionStatus.PENDING,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Transaction;
