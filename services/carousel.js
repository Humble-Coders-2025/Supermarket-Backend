const { CarouselItem } = require("../models/index.js");

const getCarouselItems = async (onlyActive = true) => {
    const carouselItems = await CarouselItem.findAll({
        where: {
            ...(onlyActive && { active: true }),
        },
    });
};

const getCarouselItemById = async (id) => {
    const carouselItem = await CarouselItem.findOne({
        where: {
            id,
        },
    });
    return carouselItem;
};

module.exports = {
    getCarouselItems,
    getCarouselItemById,
};
