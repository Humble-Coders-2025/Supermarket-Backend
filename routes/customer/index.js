const router = require("express").Router();

const authRouter = require("./auth.js");
router.use("/auth", authRouter);

module.exports = router;
