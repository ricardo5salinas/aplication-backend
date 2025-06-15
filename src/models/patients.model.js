import { pool } from '../db.js';

export const findAllPatients = async () => {
    const { rows } = await pool.query('SELECT * FROM patient');
    return rows;
};

export const createPatient = async (patientData) => {
    const { identity_card, first_name, last_name, birth_date, phone, address } = patientData;
    const { rows } = await pool.query(
        `INSERT INTO patient (identity_card, first_name, last_name, birth_date, phone, address)
        VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [identity_card, first_name, last_name, birth_date, phone, address]
    );
    return rows[0];
};

export const updatePatient = async (patient_id, patientData) => {
    const keys = Object.keys(patientData);

    if (keys.length === 0) {
        throw new Error('No fields provided for update (no se recibieron datos)');
    }

    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => patientData[key]);

    values.push(patient_id);

    const query = `
        UPDATE patient
        SET ${setClauses.join(', ')}
        WHERE patient_id = $${values.length}
        RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const deletePatient = async (patient_id) => {
    const { rows } = await pool.query(
        'DELETE FROM patient WHERE patient_id = $1 RETURNING *',
        [patient_id]
    );
    return rows[0];
};




