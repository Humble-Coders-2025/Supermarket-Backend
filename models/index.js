// Import all models here and define associations
const sequelize = require("../config/database");
const User = require("./user.js");
const {
    Category,
    Product,
    ProductAttribute,
    Attribute,
    ProductVariant,
} = require("./product");

// Export all models
module.exports = {
    sequelize,
    User,
    Category,
    Product,
    ProductAttribute,
    Attribute,
    ProductVariant,
};
