const router = require("express").Router();
const UserMiddlewares = require("../../middlewares/user.js");
const { UserTypes } = require("../../config/enums.js");

// Mandatory authentication and authorization for all routes
router.use([
    UserMiddlewares.authenticate,
    UserMiddlewares.authorizeRoles(UserTypes.ADMIN),
]);

const authRouter = require("./auth.js");
router.use("/auth", authRouter);

const dataRouter = require("./data.js");
router.use("/data", dataRouter);

const carouselRouter = require("./carousel.js");
router.use("/carousel", carouselRouter);

module.exports = router;
