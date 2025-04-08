const { codes } = require("../../config/http.js");

const getCustomerData = async (req, res, next) => {
    // TODO: Join with customer table later to get customer data
    return res.status(codes.OK).json({
        message: "Customer data retrieved successfully",
        data: req.user,
    });
};

module.exports = {
    getCustomerData,
};
