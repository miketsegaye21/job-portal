const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

module.exports = errorHandler;