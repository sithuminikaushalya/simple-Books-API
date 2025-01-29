const errorHandler = (err, req, res, next) => {
    // Log the error details (optional, you can log to a file or a logging service)
    console.error(err.stack);

    // Handle different types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'CastError' || err.name === 'MongoError') {
        return res.status(400).json({ message: 'Invalid data format' });
    }

    // Catch any unhandled errors and send a generic response
    return res.status(500).json({
        message: 'Something went wrong. Please try again later.',
    });
};

module.exports = errorHandler;
