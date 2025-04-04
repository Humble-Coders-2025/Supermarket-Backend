const codes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

class HttpError {
    constructor(statusCode, message, extras) {
        this.statusCode = statusCode;
        this.message = message;
        this.extras = extras;
        this.stack = new Error().stack;
    }
}

module.exports = {
    codes,
    HttpError,
};
