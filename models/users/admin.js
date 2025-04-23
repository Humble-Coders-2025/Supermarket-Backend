const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
    "admin",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = Admin;
