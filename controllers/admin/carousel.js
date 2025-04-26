const CarouselService = require("../../services/carousel");

const getCarouselItems = async (req, res, next) => {
    const { onlyActive, includeTimestamps } = req.query;

    const carouselItems = await CarouselService.getCarouselItems(
        onlyActive,
        includeTimestamps
    );
    return res.status(codes.OK).json({
        message: "Carousel items retrieved successfully",
        data: carouselItems,
    });
};

const getCarouselItemById = async (req, res, next) => {
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

const createCarouselItem = async (req, res, next) => {
    const carouselItem = await CarouselService.createCarouselItem({
        ...req.body,
    });
    return res.status(codes.CREATED).json({
        message: "Carousel item created successfully",
        data: carouselItem,
    });
};

const updateCarouselItem = async (req, res, next) => {
    const { id } = req.params;
    const carouselItem = await CarouselService.updateCarouselItem(id, {
        ...req.body,
    });
    if (!carouselItem) {
        return res.status(codes.NOT_FOUND).json({
            message: "Carousel item not found",
        });
    }
    return res.status(codes.OK).json({
        message: "Carousel item updated successfully",
        data: carouselItem,
    });
};

const deleteCarouselItem = async (req, res, next) => {
    const { id } = req.params;
    const carouselItem = await CarouselService.deleteCarouselItem(id);
    return res.status(codes.OK).json({
        message: "Carousel item deleted successfully",
    });
};

module.exports = {
    getCarouselItems,
    getCarouselItemById,
    createCarouselItem,
    updateCarouselItem,
    deleteCarouselItem,
};
