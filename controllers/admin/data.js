const { UserTypes } = require("../../config/enums");
const { codes, HttpError } = require("../../config/http");
const AuthService = require("../../services/auth.js");

const getAdminDataById = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "Admin ID is required"
        );
    }

    const adminData = await AuthService.getUserById(id, UserTypes.ADMIN);
    if (!adminData) {
        return res.status(codes.NOT_FOUND).json({
            message: "Admin not found",
        });
    }

    return res.status(codes.OK).json({
        message: "Admin data retrieved successfully",
        data: adminData,
    });
};

const getAllAdmins = async (req, res, next) => {
    const admins = await AuthService.getAllUsers(UserTypes.ADMIN);
    return res.status(codes.OK).json({
        message: "Admins retrieved successfully",
        data: admins,
    });
};

module.exports = {
    getAdminDataById,
    getAllAdmins,
};
