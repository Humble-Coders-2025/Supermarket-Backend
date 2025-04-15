const router = require("express").Router();
const CarouselController = require("../../controllers/customer/carousel.js");

router.get("/", CarouselController.getCarouselItems);
router.get("/:id", CarouselController.getCarouselItemsById);

module.exports = router;
