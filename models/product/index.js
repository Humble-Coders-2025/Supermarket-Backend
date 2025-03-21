const Product = require("./product");
const Attribute = require("./attribute");
const ProductAttribute = require("./product_attribute");
const ProductVariant = require("./product_variant");
const Category = require("./category");

// Define associations
Product.hasMany(ProductVariant, {
    as: "variants",
});
ProductVariant.belongsTo(Product, {
    as: "product",
});

ProductVariant.hasMany(ProductAttribute, {
    as: "attributes",
});
ProductAttribute.belongsTo(ProductVariant, {
    as: "variant",
});

Attribute.hasMany(ProductAttribute);
ProductAttribute.belongsTo(Attribute);

Category.hasMany(Category, {
    as: "subCategories",
    foreignKey: "parentCategoryId",
});
Category.belongsTo(Category, {
    as: "parentCategory",
    foreignKey: "parentCategoryId",
});

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
    Category,
    Product,
    Attribute,
    ProductAttribute,
    ProductVariant,
};
