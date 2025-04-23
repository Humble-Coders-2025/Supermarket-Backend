const { HttpError, codes } = require("../config/http");

const verifytoken = async (tokenString, requiredFields = ["user_id"]) => {
    if (!tokenString)
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "Authorization token is required"
        );
    if (!tokenString.startsWith("Bearer "))
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "Authorization token is invalid"
        );

    const token = tokenString.split(" ")[1];
    const firebaseAdmin = require("../config/firebase.js");

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

        // Extract the required fields from the decoded token
        const userData = {};
        requiredFields.forEach((field) => {
            if (decodedToken[field]) {
                userData[field] = decodedToken[field];
            } else {
                throw new HttpError(
                    codes.INTERNAL_SERVER_ERROR,
                    `Missing field ${field} in token`
                );
            }
        });
        return userData;
    } catch (err) {
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "Authorization token is invalid",
            err
        );
    }
};

const getUserById = async (userId, userType, fields) => {
    const { User } = require("../models/index.js");
    if (!userId || !userType)
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "User ID and Type is required"
        );
    if (!fields) fields = User.getAttributes();
    const user = await User.findOne({
        where: { id: userId, type: userType },
        attributes: fields,
    });
    return user;
};

const createUser = async (userData) => {
    const { UserTypes } = require("../config/enums.js");
    if (userData.type == UserTypes.ADMIN) {
        throw new HttpError(
            codes.BAD_REQUEST,
            "Cannot create admin user directly"
        );
    }

    const { User } = require("../models/index.js");
    if (!userData)
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "User data is required"
        );

    const user = await User.create(userData);
    return user;
};

const getAllUsers = async (userType, fields, offset, limit) => {
    const { User } = require("../models/index.js");
    if (!userType)
        throw new HttpError(
            codes.INTERNAL_SERVER_ERROR,
            "User Type is required"
        );
    if (!fields) fields = User.getAttributes();
    const users = await User.findAll({
        where: { type: userType },
        attributes: fields,
        offset,
        limit,
    });
    return users;
};

module.exports = {
    verifytoken,
    getUserById,
    createUser,
    getAllUsers,
};
