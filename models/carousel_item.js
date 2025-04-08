const sequelize = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { CarouselItemType, DiscountType } = require("../config/enums.js");

const CarouselItem = sequelize.define("carouselItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    discountType: {
        type: DataTypes.ENUM(Object.values(DiscountType)),
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    text: {
        type: DataTypes.STRING,
    },
    buttonText: {
        type: DataTypes.STRING,
    },
    buttonLink: {
        type: DataTypes.STRING,
    },
});

module.exports = CarouselItem;
