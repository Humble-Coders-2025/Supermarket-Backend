const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const extras = err.extras || null;
    const stack = process.env.NODE_ENV === "production" ? null : err.stack;

    return res.status(statusCode).json({
        statusCode,
        message,
        extras,
        stack,
    });
};

module.exports = errorHandler;
