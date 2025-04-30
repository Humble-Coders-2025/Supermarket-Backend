const CategoryService = require("../../services/category");
const { codes, HttpError } = require("../../config/http");

const create = async (req, res, next) => {
    const category = await CategoryService.create({
        ...req.body,
    });
    return res.status(codes.CREATED).json({
        message: "Category created successfully",
        data: category,
    });
};

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

const update = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await CategoryService.update(id, {
            ...req.body,
        });
        return res.status(codes.OK).json({
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await CategoryService.remove(id);

        return res.status(codes.OK).json({
            message: "Category deleted successfully",
            data: category,
        });
    } catch (error) {
        next(error);
    }
};

const getSubcategoriesByCategoryId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const subcategories =
            await CategoryService.getSubcategoriesByCategoryId(id);
        return res.status(codes.OK).json({
            message: "Subcategories retrieved successfully",
            data: subcategories,
        });
    } catch (error) {
        next(error);
    }
};

const addSubcategory = async (req, res, next) => {
    const { parentId, subcategoryId } = req.body;
    try {
        const subcategory = await CategoryService.addSubcategory(
            parentId,
            subcategoryId
        );
        return res.status(codes.OK).json({
            message: "Subcategory added successfully",
            data: subcategory,
        });
    } catch (error) {
        return next(error);
    }
};

const removeSubcategory = async (req, res, next) => {
    const { parentId, subcategoryId } = req.body;
    try {
        const subcategory = await CategoryService.removeSubcategory(
            parentId,
            subcategoryId
        );
        return res.status(codes.OK).json({
            message: "Subcategory removed successfully",
            data: subcategory,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getSubcategoriesByCategoryId,
    addSubcategory,
    removeSubcategory,
};
