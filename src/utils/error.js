const errorList = {
    EMAIL_EXISTS: {
        status: 400,
        message: "Email already exists.",
        error: "Bad Request",
    },
    EMAIL_NOT_FOUND: {
        status: 404,
        message: "Request not found.",
        error: "Not Found",
    },  
    NO_ACCESS: {
        status: 403,
        message: "Access denied.",
        error: "Forbidden",
    },
    INVALID_ID: {
        status: 400,
        message: "Invalid ID format.",
        error: "Bad Request",
    },
    INTERNAL_ERROR: {
        status: 500,
        message: "Internal server error.",
        error: "Internal Server Error",
    },
    UNAUTOHORIZED: {
        status: 401,
        message: "Token is missing or invalid.",
        error: "Unauthorized",
    },   
};

export function createError(code) {
    const {
    status = 500,
    message = "Internal server error.",
    error = "Internal Server Error",
    }= errorList[code] || {};
    const err = new Error(message);
    error.status = status;
    err.name = error;
    return err;
}
