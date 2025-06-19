import { pool } from '../db.js';

export const findUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return rows[0];
};

export const findUserByIdentityCard = async (identity_card) => {
    const { rows } = await pool.query('SELECT * FROM "user" WHERE identity_card = $1', [identity_card]);
    return rows[0];
};

export const findAllUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM "user"');
    return rows;
};

export const createUser = async (userData) => {
    const { identity_card, first_name, last_name, role_id, email, password, address, phone } = userData;
    const { rows } = await pool.query(
        'INSERT INTO "user" (identity_card, first_name, last_name, role_id, email, password, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [identity_card, first_name, last_name, role_id, email, password, address, phone]
    );

    return rows[0];
};

export const updateUser = async (user_id, userData) => {
    const keys = Object.keys(userData);

    if (keys.length === 0) {
        throw new Error('No fields provided for update (no se recibio datos)');
    }

    // generar las partes dinámicas del SQL
    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => userData[key]);

    // agregar el ID al final de los valores
    values.push(user_id);

    const query = `
        UPDATE "user"
        SET ${setClauses.join(', ')}
        WHERE user_id = $${values.length}
        RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows[0]; 
};

export const deleteUser = async (user_id) => {
    const { rows } = await pool.query('DELETE FROM "user" WHERE user_id = $1 RETURNING *', [user_id]);
    return rows[0]; 
};