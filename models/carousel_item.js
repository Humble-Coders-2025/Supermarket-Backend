const sequelize = require("../config/database.js");
const { DataTypes } = require("sequelize");
const { CarouselItemType, DiscountType } = require("../config/enums.js");

const CarouselItem = sequelize.define(
    "carouselItem",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM(Object.values(CarouselItemType)),
            allowNull: false,
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
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        underscored: true,
        timestamps: true,
        validate: {
            discountAndDiscountType() {
                if (
                    this.type == CarouselItemType.DISCOUNT &&
                    !(this.discount && this.discountType)
                ) {
                    throw new Error(
                        "Discount and discount type are required when type is DISCOUNT."
                    );
                }
            },
        },
    }
);

module.exports = CarouselItem;
