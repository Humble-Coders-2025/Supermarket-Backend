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

const createCarouselItem = async (carouselItemData) => {
    const carouselItem = await CarouselItem.create(carouselItemData);
    return carouselItem;
};

const updateCarouselItem = async (id, carouselItemData) => {
    const carouselItem = await CarouselItem.findOne({
        where: {
            id,
        },
    });
    if (!carouselItem) return null;
    await carouselItem.update(carouselItemData);
    return carouselItem;
};

const deleteCarouselItem = async (id) => {
    const carouselItem = await CarouselItem.findOne({
        where: {
            id,
        },
    });
    if (!carouselItem) return null;
    await carouselItem.destroy();
    return carouselItem;
};

module.exports = {
    getCarouselItems,
    getCarouselItemById,
    createCarouselItem,
    updateCarouselItem,
};
