const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const DeliveryPartner = sequelize.define(
    "deliveryPartner",
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

module.exports = DeliveryPartner;
