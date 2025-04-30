const CategoryService = require("../../services/category");

const getAll = async (req, res, next) => {
    const { limit, offset } = req.query;
    const categories = await CategoryService.getAll(limit, offset);
    return res.status(codes.OK).json({
        message: "Categories retrieved successfully",
        data: categories,
    });
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryService.getById(id);
    if (!category) {
        return next(new HttpError(codes.NOT_FOUND, "Category not found", id));
    }
    return res.status(codes.OK).json({
        message: "Category retrieved successfully",
        data: category,
    });
};

const getSubcategoriesByCategoryId = async (req, res, next) => {
    const { id } = req.params;
    const subcategories = await CategoryService.getSubcategoriesByCategoryId(
        id
    );
    if (!subcategories) {
        return next(
            new HttpError(codes.NOT_FOUND, "Subcategories not found", id)
        );
    }
    return res.status(codes.OK).json({
        message: "Subcategories retrieved successfully",
        data: subcategories,
    });
};

module.exports = {
    getAll,
    getById,
    getSubcategoriesByCategoryId,
};
