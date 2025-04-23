const { CarouselItem } = require("../models/index.js");

const getCarouselItems = async (
    onlyActive = true,
    includeTimestamps = false
) => {
    const carouselItems = await CarouselItem.findAll({
        where: {
            ...(onlyActive && { active: true }),
        },
        attributes: {
            ...(!includeTimestamps && { exclude: ["createdAt", "updatedAt"] }),
        },
    });
    return carouselItems;
};

const getCarouselItemById = async (id, includeTimestamps = false) => {
    const carouselItem = await CarouselItem.findOne({
        where: {
            id,
        },
        attributes: {
            ...(!includeTimestamps && { exclude: ["createdAt", "updatedAt"] }),
        },
    });
    return carouselItem;
};

module.exports = {
    getCarouselItems,
    getCarouselItemById,
};
