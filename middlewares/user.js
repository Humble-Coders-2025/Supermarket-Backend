const { HttpError } = require("../config/http");
const { User } = require("../models");
const firebaseAdmin = require("../config/firebase");

const userExists = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) return next(new HttpError(401, "No token provided!"));

        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const user = await User.findByPk(decodedToken.uid);
        if (!user) return next(new HttpError(404, "User not found!"));

        req.user = user;
        return next();
    } catch (e) {
        next(e);
    }
};

module.exports = userExists;
