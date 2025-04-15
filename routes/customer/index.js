const router = require("express").Router();
const UserMiddlewares = require("../../middlewares/user.js");
const { UserTypes } = require("../../config/enums.js");

const authRouter = require("./auth.js");
router.use("/auth", authRouter);

// Mandatory authentication and authorization for all routes after this point
router.use([
    UserMiddlewares.authenticate,
    UserMiddlewares.authorizeRoles(UserTypes.CUSTOMER),
]);

const dataRouter = require("./data.js");
router.use("/data", dataRouter);

const carouselRouter = require("./carousel.js");
router.use("/carousel", carouselRouter);

module.exports = router;
