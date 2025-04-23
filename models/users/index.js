const User = require("./user.js");
const Admin = require("./admin.js");
const Customer = require("./customer.js");
const DeliveryPartner = require("./delivery_partner.js");

User.hasOne(Customer);
Customer.belongsTo(User);

User.hasOne(Admin);
Admin.belongsTo(User);

User.hasOne(DeliveryPartner);
DeliveryPartner.belongsTo(User);

module.exports = {
    User,
    Admin,
    Customer,
    DeliveryPartner,
};
