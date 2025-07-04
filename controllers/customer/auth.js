const { UserTypes } = require("../../config/enums.js");
const { codes, HttpError } = require("../../config/http.js");
const AuthService = require("../../services/auth.js");

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
        user = await AuthService.getUserById(
            userData.user_id,
            UserTypes.CUSTOMER
        );
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

const register = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        // Verify the authorization header
        const userData = await AuthService.verifytoken(authorization, [
            "user_id",
            "phone_number",
        ]);

        // IMPORTANT: Change to allow other login methods in future
        if (!userData.phone_number) {
            return res.status(codes.BAD_REQUEST).json({
                message: "Only phone logins are allowed for Customers",
            });
        }

        // Check if user exists in the database
        const existingUser = await AuthService.getUserById(
            userData.user_id,
            UserTypes.CUSTOMER
        );
        if (existingUser) {
            return res.status(codes.CONFLICT).json({
                message: "User already exists",
                user: existingUser,
            });
        }

        // Create a new user in the database
        const user = await AuthService.createUser({
            id: userData.user_id,
            ...req.body,
            phone: userData.phone_number,
            type: UserTypes.CUSTOMER,
        });

        return res.status(codes.OK).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        return next(
            new HttpError(
                codes.INTERNAL_SERVER_ERROR,
                "Registration failed",
                error
            )
        );
    }
};

module.exports = {
    login,
    register,
};
