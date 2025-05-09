const AuthService = require("../../services/auth");
const { UserTypes } = require("../../config/enums");
const { codes, HttpError } = require("../../config/http");

const login = async (req, res, next) => {
    return res.status(codes.OK).json({
        user: req.user,
    });
};

module.exports = {
    login,
};
