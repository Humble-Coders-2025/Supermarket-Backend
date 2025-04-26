const router = require("express").Router();
const DataController = require("../../controllers/admin/data.js");

router.get("/", DataController.getAllAdmins);
router.get("/:id", DataController.getAdminDataById);

module.exports = router;