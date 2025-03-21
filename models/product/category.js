const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const Category = sequelize.define(
    "category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        ImageUrl: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        },
    },
    {
        underscored: true,
        timestamps: false,
    }
);

module.exports = Category;
