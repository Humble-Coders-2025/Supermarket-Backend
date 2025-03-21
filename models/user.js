const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const { UserTypes } = require("../config/enums");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            comment: "Firebase UID",
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        phone: {
            type: DataTypes.STRING(15),
        },
        type: {
            type: DataTypes.ENUM(Object.values(UserTypes)),
            allowNull: false,
            defaultValue: UserTypes.CUSTOMER,
        },
        profile_picture_url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
);

module.exports = User;
