const router = require("express").Router();
const DataController = require("../../controllers/customer/data.js");

router.get("/", DataController.getCustomerData);

module.exports = router;
