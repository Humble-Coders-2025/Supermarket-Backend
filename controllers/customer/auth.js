const { UserTypes } = require("../../config/enums.js");
const { codes } = require("../../config/http.js");
const AuthService = require("../../services/auth.js");

const login = (req, res, next) => {
    const { authorization } = req.headers;

    // Verify the authorization header
    const userData = AuthService.verifytoken(authorization, ["uid"]);

    // Check if user exists in the database
    const user = AuthService.getUserById(userData.uid, UserTypes.CUSTOMER);
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

const register = (req, res, next) => {
    const { authorization } = req.headers;

    // Verify the authorization header
    const userData = AuthService.verifytoken(authorization, [
        "uid",
        "phone_number",
    ]);

    // IMPORTANT: Change to allow other login methods in future
    if (!userData.phone_number) {
        return res.status(codes.BAD_REQUEST).json({
            message: "Only phone logins are allowed for Customers",
        });
    }

    // Check if user exists in the database
    const existingUser = AuthService.getUserById(
        userData.uid,
        UserTypes.CUSTOMER
    );
    if (existingUser) {
        return res.status(codes.CONFLICT).json({
            message: "User already exists",
            user: existingUser,
        });
    }

    // Create a new user in the database
    const user = AuthService.createUser({
        id: userData.uid,
        ...req.body,
        phone: userData.phone_number,
        type: UserTypes.CUSTOMER,
    });

    return res.status(codes.OK).json({
        message: "User registered successfully",
        user,
    });
};

module.exports = {
    login,
    register,
};
