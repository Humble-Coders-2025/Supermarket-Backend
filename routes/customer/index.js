const router = require("express").Router();
const UserMiddlewares = require("../../middlewares/user.js");
const customerMiddleware = [
    UserMiddlewares.userExists,
    UserMiddlewares.isCustomer,
];

const authRouter = require("./auth.js");
router.use("/auth", authRouter);

const dataRouter = require("./data.js");
router.use("/data", customerMiddleware, dataRouter);

module.exports = router;
