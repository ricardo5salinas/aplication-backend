import { pool } from '../db.js';

export const getUsers = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM "user"');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const postUsers = async (req, res) => {
    const { identity_card, first_name, last_name, role_id, email, password, address, phone } = req.body;
    try {
        const {rows} = await pool.query(
            'INSERT INTO "user" (identity_card, first_name, last_name, role_id, email, password, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [identity_card, first_name, last_name, role_id, email, password, address, phone]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

};

export const putUsers = async (req, res) => {
    const { id } = req.params;
    const { identity_card, first_name, last_name, role_id, email, password, address, phone } = req.body;
    try {
        const {rows} = await pool.query(
            'UPDATE "user" SET identity_card = $1, first_name = $2, last_name = $3, role_id = $4, email = $5, password = $6, address = $7, phone = $8 WHERE id = $9 RETURNING *',
            [identity_card, first_name, last_name, role_id, email, password, address, phone, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}