const router = require("express").Router();
const UserMiddlewares = require("../../middlewares/user.js");
const { UserTypes } = require("../../config/enums.js");

const authRouter = require("./auth.js");
router.use("/auth", authRouter);

const dataRouter = require("./data.js");
router.use(
    "/data",
    [
        UserMiddlewares.authenticate,
        UserMiddlewares.authorizeRoles(UserTypes.CUSTOMER),
    ],
    dataRouter
);

module.exports = router;
