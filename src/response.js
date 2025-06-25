const successResponse = (data) => ({
    status: 'success',
    ...data,
});

const failResponse = (message) => ({
    status: 'fail',
    message,
});

const errorResponse = (message) => ({
    status: 'error',
    message,
});

module.exports = { successResponse, failResponse, errorResponse };
