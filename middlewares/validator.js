const { codes, HttpError } = require("../config/http");
const { validationResult } = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(
                new HttpError(
                    codes.BAD_REQUEST,
                    "Validation failed",
                    errors.array()
                )
            );
        }
        next();
    };
};

module.exports = validate;
