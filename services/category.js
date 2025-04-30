const { HttpError, codes } = require("../config/http");
const { Category } = require("../models/");

const create = async (CategoryData) => {
    const category = await Category.create(CategoryData);
    return category;
};

const getAll = async (includeSubcategories = true, limit, offset) => {
    const categories = await Category.findAndCountAll({
        limit,
        offset,
        where: {
            parentCategoryId: null,
        },
        ...(includeSubcategories && {
            include: [
                {
                    model: Category,
                    as: "subCategories",
                },
            ],
        }),
    });

    return categories;
};

const getById = async (includeSubcategories, id) => {
    const category = await Category.findOne({
        where: {
            id,
        },
        ...(includeSubcategories && {
            include: [
                {
                    model: Category,
                    as: "subCategories",
                },
            ],
        }),
    });
    return category;
};

const update = async (id, CategoryData) => {
    const category = await Category.findByPk(id);
    if (!category) throw HttpError(codes.NOT_FOUND, "Category not found", id);
    await category.update(CategoryData);
    return category;
};

const remove = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw HttpError(codes.NOT_FOUND, "Category not found", id);
    await category.destroy();
    return category;
};

const getSubcategoriesByCategoryId = async (id) => {
    const subcategories = await Category.findAll({
        where: {
            parentCategoryId: id,
        },
    });
    return subcategories;
};

const addSubcategory = async (parentId, subcategoryId) => {
    const [parentCategory, subcategory] = await Promise.all([
        Category.findByPk(parentId),
        Category.findByPk(subcategoryId),
    ]);

    if (!parentCategory)
        throw HttpError(codes.NOT_FOUND, "Parent category not found", parentId);
    if (!subcategory)
        throw HttpError(
            codes.NOT_FOUND,
            "Subcategory not found",
            subcategoryId
        );

    await parentCategory.addSubCategory(subcategory);
    return subcategory;
};

const removeSubcategory = async (parentId, subcategoryId) => {
    const [parentCategory, subcategory] = await Promise.all([
        Category.findByPk(parentId),
        Category.findByPk(subcategoryId),
    ]);

    if (!parentCategory)
        throw HttpError(codes.NOT_FOUND, "Parent category not found", parentId);
    if (!subcategory)
        throw HttpError(
            codes.NOT_FOUND,
            "Subcategory not found",
            subcategoryId
        );

    await parentCategory.removeSubCategory(subcategory);
    return subcategory;
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
