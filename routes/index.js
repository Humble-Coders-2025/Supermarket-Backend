const router = require("express").Router();

const customerRouter = require("./customer/index.js");
router.use("/customer", customerRouter);

const adminRouter = require("./admin/index.js");
router.use("/admin", adminRouter);

module.exports = router;
