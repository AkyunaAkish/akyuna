// reusable function to respond to requests with an error in a consistent data format
module.exports = (res, status = 500, message = 'error', error = null) => {
    res.status(status).json({
        message,
        error
    });
};