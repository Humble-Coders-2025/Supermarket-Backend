const { codes } = require("../config/http");
const { validationResult } = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(codes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }
        next();
    };
};

module.exports = validate;
