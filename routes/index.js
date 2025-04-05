const router = require("express").Router();

const customerRouter = require("./customer/index.js");
router.use("/customer", customerRouter);

module.exports = router;
