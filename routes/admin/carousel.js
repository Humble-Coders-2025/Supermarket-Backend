const router = require("express").Router();
const { header, body, param } = require("express-validator");
const CarouselController = require("../../controllers/admin/carousel.js");
const { CarouselItemType, DiscountType } = require("../../config/enums");
const validate = require("../../middlewares/validator.js");

router.get(
    "/",
    validate([
        param("onlyActive").optional().isBoolean(),
        param("includeTimestamps").optional().isBoolean(),
    ]),
    CarouselController.getCarouselItems
);
router.get("/:id", CarouselController.getCarouselItemById);
router.post(
    "/",
    validate([
        body("type")
            .notEmpty()
            .isIn(Object.values(CarouselItemType))
            .withMessage(
                "Type is required and must be one of the following: " +
                    Object.values(CarouselItemType).join(", ")
            ),
        body("discountType")
            .if(body("type").equals(CarouselItemType.DISCOUNT))
            .notEmpty()
            .isIn(Object.values(DiscountType))
            .withMessage(
                "Discount type must be one of the following: " +
                    Object.values(DiscountType).join(", ")
            ),
        body("discount")
            .if(body("type").equals(CarouselItemType.DISCOUNT))
            .notEmpty()
            .withMessage("Discount is required"),
        body("image")
            .notEmpty()
            .isURL()
            .withMessage("Image must be a valid URL"),
    ]),
    CarouselController.createCarouselItem
);
router.patch("/:id", CarouselController.updateCarouselItem);
router.delete("/:id", CarouselController.deleteCarouselItem);

module.exports = router;
