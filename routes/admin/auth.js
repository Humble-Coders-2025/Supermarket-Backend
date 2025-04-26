const router = require("express").Router();
const AuthController = require("../../controllers/admin/auth.js");

router.get("/login", AuthController.login);

module.exports = router;
