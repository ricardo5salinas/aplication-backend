const errorList = {
    
    UNAUTOHORIZED: {
        status: 401,
        message: "Token is missing or invalid.",
        error: "Unauthorized",
    }, 
    EMAIL_EXISTS: {
    status: 400,
    message: "Email already exists.",
    error: "Bad Request",
  },
  CARD_EXISTS: {
    status: 400,
    message: "Identity card already exists.",
    error: "Bad Request",
  },
  EMAIL_NOT_FOUND: {
    status: 404,
    message: "Email not found.",
    error: "Not Found",
  },
  USER_NOT_FOUND: {
    status: 404,
    message: "User not found.",
    error: "Not Found",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found.",
    error: "Not Found",
  },
  INVALID_ID: {
    status: 400,
    message: "Invalid ID format.",
    error: "Bad Request",
  },
  INVALID_DATA: {
    status: 400,
    message: "Invalid or incomplete data.",
    error: "Bad Request",
  },
  MISSING_FIELDS: {
    status: 400,
    message: "Required fields are missing.",
    error: "Bad Request",
  },
  NO_ACCESS: {
    status: 403,
    message: "Access denied.",
    error: "Forbidden",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Token is missing or invalid.",
    error: "Unauthorized",
  },
  TOKEN_EXPIRED: {
    status: 401,
    message: "Token has expired.",
    error: "Unauthorized",
  },
  QUERY_FAILED: {
    status: 500,
    message: "Database query failed.",
    error: "Internal Server Error",
  },
  USER_NOT_FOUND: {
  status: 404,
  message: "User not found.",
  error: "Not Found",
},
  INTERNAL_ERROR: {
    status: 500,
    message: "Internal server error.",
    error: "Internal Server Error",
  },  
};

export function createError(code) {
  const {
    status = 500,
    message = "Internal server error.",
    error = "Internal Server Error",
  } = errorList[code] || {};

  const err = new Error(message);
  err.status = status;       // 
  err.name = error;          // 
  return err;
}
