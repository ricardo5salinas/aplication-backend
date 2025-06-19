import { pool } from '../db.js';
import { createError } from '../utils/error.js'; 

export const findUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return rows[0];
};

export const findUserByIdentityCard = async (identity_card) => {
    const { rows } = await pool.query('SELECT * FROM "user" WHERE identity_card = $1', [identity_card]);
    return rows[0];
};

export const findAllUsers = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM "user"');
        return rows;
    } catch (err) {
        throw createError('INTERNAL_ERROR');
    }
};

export const createUser = async (userData) => {
    const { identity_card, first_name, last_name, role_id, email, password, address, phone } = userData;

    try {
        const { rows } = await pool.query(
            'INSERT INTO "user" (identity_card, first_name, last_name, role_id, email, password, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [identity_card, first_name, last_name, role_id, email, password, address, phone]
        );

        return rows[0];
    } catch (err) {
        
        if (err.code === '23505') {
            throw createError('EMAIL_EXISTS');
        }
        throw createError('INTERNAL_ERROR');
    }
};

export const updateUser = async (user_id, userData) => {

    if (!Number.isInteger(Number(user_id))) {
    throw createError('INVALID_ID');
}

    const keys = Object.keys(userData);
    if (keys.length === 0) {
        throw createError('MISSING_FIELDS'); 
    }

    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => userData[key]);
    values.push(user_id); 

    try {
        const query = `
        UPDATE "user"
        SET ${setClauses.join(', ')}
        WHERE user_id = $${values.length}
        RETURNING *
        `;

        const { rows } = await pool.query(query, values);

        if (!rows.length) {
        throw createError('USER_NOT_FOUND');
        }

    return rows[0];

    } catch (err) {
        if (err.status) throw err; 
        throw createError('INTERNAL_ERROR');
    }
};

export const deleteUser = async (user_id) => {

    if (!Number.isInteger(Number(user_id))) {
        throw createError('INVALID_ID');
    }

    try {
        const { rows } = await pool.query(
        'DELETE FROM "user" WHERE user_id = $1 RETURNING *',
        [user_id]
        );

        if (!rows.length) {
        throw createError('USER_NOT_FOUND');
        }

        return rows[0];
    } catch (err) {
        if (err.status) throw err;
        throw createError('INTERNAL_ERROR');
    }
};

