const AuthService = require("../../services/auth");
const { UserTypes } = require("../../config/enums");
const { codes, HttpError } = require("../../config/http");

const login = async (req, res, next) => {
    const { authorization } = req.headers;

    // Verify the authorization header
    var userData;
    try {
        userData = await AuthService.verifytoken(authorization, ["user_id"]);
    } catch (error) {
        return next(error);
    }

    // Check if user exists in the database
    var user;
    try {
        user = await AuthService.getUserById(userData.user_id, UserTypes.ADMIN);
    } catch (error) {
        return next(error);
    }
    if (!user) {
        return res.status(codes.OK).json({
            newUser: true,
        });
    }

    return res.status(codes.OK).json({
        newUser: false,
        user,
    });
};

module.exports = {
    login,
};
