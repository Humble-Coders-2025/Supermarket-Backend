const { HttpError } = require("../config/http");
const { User } = require("../models");
const firebaseAdmin = require("../config/firebase");

const authenticate = async (req, res, next) => {
    const { Admin, Customer, DeliveryPartner } = require("../models/index.js");
    if (!req.headers.authorization)
        return next(new HttpError(401, "No token provided!"));
    const token = req.headers.authorization.toString().replace("Bearer ", "");

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const user = await User.findByPk(decodedToken.user_id, {
            include: [Admin, Customer, DeliveryPartner],
        });
        if (!user) return next(new HttpError(404, "User not found!"));

        req.user = user;
        return next();
    } catch (e) {
        next(new HttpError(401, "Invalid token!", e));
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user)
            return next(new HttpError(401, "User not authenticated!"));

        if (!allowedRoles.includes(req.user.type)) {
            return next(
                new HttpError(
                    403,
                    `Access denied! Only allowed for ${allowedRoles.join(", ")}`
                )
            );
        }

        return next();
    };
};

module.exports = { authenticate, authorizeRoles };
