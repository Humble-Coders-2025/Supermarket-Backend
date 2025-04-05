const router = require("express").Router();
const { header, body, oneOf } = require("express-validator");
const AuthController = require("../../controllers/customer/auth");
const validate = require("../../middlewares/validator");
const Enums = require("../../config/enums");

router.get(
    "/login",
    validate([
        header("authorization")
            .notEmpty()
            .withMessage("Authorization header is required"),
    ]),
    AuthController.login
);

router.post(
    "/register",
    validate([
        header("authorization")
            .notEmpty()
            .withMessage("Authorization header is required"),
        body("userType").isEmpty().withMessage("Cannot set user type"),
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("phone")
            .isMobilePhone("en-IN")
            .withMessage("Phone number is required"),
    ]),
    AuthController.register
);

module.exports = router;
