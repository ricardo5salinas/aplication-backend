import { createError} from "./error.js";

export const validateId = (id) => {
    const numericId = Number(id);
    if (isNaN(numericId) || !Number.isInteger(numericId)) {
        throw createError('INVALID_ID');
    }
    return numericId ;   
}