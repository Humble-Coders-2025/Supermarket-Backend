const router = require("express").Router();
const UserMiddlewares = require("../../middlewares/user.js");
const { UserTypes } = require("../../config/enums.js");
const DataController = require("../../controllers/admin/data.js");

const authRouter = require("./auth.js");
router.use("/auth", authRouter);

// Mandatory authentication and authorization for all routes
router.use([
    UserMiddlewares.authenticate,
    UserMiddlewares.authorizeRoles(UserTypes.ADMIN),
]);

router.get("/", DataController.getAllAdmins);
router.get("/:id", DataController.getAdminDataById);

module.exports = router;
