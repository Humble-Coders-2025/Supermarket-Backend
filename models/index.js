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
const Order = require("./order.js");
const Transaction = require("./transaction.js");

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Transaction);
Transaction.belongsTo(User);

Order.hasOne(Transaction);
Transaction.belongsTo(Order);

Order.belongsToMany(ProductVariant, { through: "order_product_variants" });
ProductVariant.belongsToMany(Order, { through: "order_product_variants" });

// Export all models
module.exports = {
    sequelize,
    User,
    Category,
    Product,
    ProductAttribute,
    Attribute,
    ProductVariant,
    Order,
    Transaction,
};
