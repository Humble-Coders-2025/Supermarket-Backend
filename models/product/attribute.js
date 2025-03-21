const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const Attribute = sequelize.define("attribute", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Attribute;
