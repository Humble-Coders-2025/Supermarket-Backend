const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
    "admin",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Admin;
