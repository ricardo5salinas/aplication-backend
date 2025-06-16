import { pool } from '../db.js';

export const findAllPayments = async () => {
    const { rows } = await pool.query('SELECT * FROM payment');
    return rows;
};

export const createPayment = async (paymentData) => {
    const { amount, payment_date, payment_method_id } = paymentData;
    const { rows } = await pool.query(
        'INSERT INTO payment (amount, payment_date, payment_method_id) VALUES ($1, $2, $3) RETURNING *',
        [amount, payment_date, payment_method_id]
    );
    return rows[0];
};

export const updatePayment = async (payment_id, paymentData) => {
    const keys = Object.keys(paymentData);

    if (keys.length === 0) {
        throw new Error('No fields provided for update (no se recibio datos)');
    }

    // generar las partes dinámicas del SQL
    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => paymentData[key]);

    // agregar el ID al final de los valores
    values.push(payment_id);

    const query = `
        UPDATE payment
        SET ${setClauses.join(', ')}
        WHERE payment_id = $${values.length}
        RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows[0]; 
};

export const deletePayment = async (payment_id) => {
    const { rows } = await pool.query('DELETE FROM payment WHERE payment_id = $1 RETURNING *', [payment_id]);
    return rows[0]; 
};