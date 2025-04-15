const CarouselService = require("../../services/carousel.js");
const { codes } = require("../../config/http.js");

const getCarouselItems = async (req, res, next) => {
    const carouselItems = await CarouselService.getCarouselItems();
    return res.status(codes.OK).json({
        message: "Carousel items retrieved successfully",
        data: carouselItems,
    });
};

const getCarouselItemsById = async (req, res, next) => {
    const { id } = req.params;
    const carouselItem = await CarouselService.getCarouselItemById(id);
    if (!carouselItem) {
        return res.status(codes.NOT_FOUND).json({
            message: "Carousel item not found",
        });
    }
    return res.status(codes.OK).json({
        message: "Carousel item retrieved successfully",
        data: carouselItem,
    });
};

module.exports = {
    getCarouselItems,
    getCarouselItemsById,
};
