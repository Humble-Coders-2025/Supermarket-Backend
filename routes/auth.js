const router = require("express").Router();
const { header } = require("express-validator");
const AuthController = require("../controllers/auth");
const validate = require("../middlewares/validator");

router.get(
    "/login",
    validate([
        header("authorization")
            .notEmpty()
            .withMessage("Authorization header is required"),
    ]),
    AuthController.login
);

module.exports = router;
