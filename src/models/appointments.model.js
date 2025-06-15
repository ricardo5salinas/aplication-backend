import { pool } from '../db.js';

export const findAllAppointments = async () => {
    const { rows } = await pool.query('SELECT * FROM appointment');
    return rows;
};

export const createAppointment = async (appointmentData) => {
    const { date, patient_id, doctor_id, payment_id, status, medication_id } = appointmentData;
    const { rows } = await pool.query(
        'INSERT INTO appointment (date, patient_id, doctor_id, payment_id, status, medication_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [date, patient_id, doctor_id, payment_id, status, medication_id]
    );
    return rows[0];
};

export const updateAppointment = async (appointment_id, appointmentData) => {
    const keys = Object.keys(appointmentData);

    if (keys.length === 0) {
        throw new Error('No fields provided for update (no se recibio datos)');
    }

    // generar las partes dinámicas del SQL
    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => appointmentData[key]);

    // agregar el ID al final de los valores
    values.push(appointment_id);

    const query = `
        UPDATE appointment
        SET ${setClauses.join(', ')}
        WHERE appointment_id = $${values.length}
        RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows[0]; 
};

export const deleteAppointment = async (appointment_id) => {
    const { rows } = await pool.query('DELETE FROM appointment WHERE appointment_id = $1 RETURNING *', [appointment_id]);
    return rows[0]; 
};