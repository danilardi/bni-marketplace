function errorHandler(err, req, res, next) {
    let statusCode = err.status
    let message = err.message
    console.log(err.message)
    res.status(statusCode || 500).json({
        message: message || 'Internal Server Error',
    });
}

module.exports = errorHandler;