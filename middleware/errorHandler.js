const errorHandler = (err, req, res, next) => {
    //console.error(err);
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err.message === 'User not found') {
        statusCode = 404;
        message = 'User not found';
    }
    if (err.message === 'Bad Request') {
        statusCode = 400;
        message = 'Bad Request';
    }
    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;