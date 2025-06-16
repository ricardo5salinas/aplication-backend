import { pool } from '../db.js';

export const findAllDoctors = async () => {
    const { rows } = await pool.query('SELECT * FROM doctor');
    return rows;
};

export const createDoctor = async (doctorData) => {
    const { user_id, license_number, created_at } = doctorData;
    const { rows } = await pool.query(
        'INSERT INTO doctor (user_id, license_number, created_at) VALUES ($1, $2, $3) RETURNING *',
        [user_id, license_number, created_at]
    );
    return rows[0];
};

export const updateDoctor = async (doctor_id, doctorData) => {
    const keys = Object.keys(doctorData);

    if (keys.length === 0) {
        throw new Error('No fields provided for update (no se recibio datos)');
    }

    // generar las partes dinámicas del SQL
    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => doctorData[key]);

    // agregar el ID al final de los valores
    values.push(doctor_id);

    const query = `
        UPDATE doctor
        SET ${setClauses.join(', ')}
        WHERE doctor_id = $${values.length}
        RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows[0]; 
};

export const deleteDoctor = async (doctor_id) => {
    const { rows } = await pool.query('DELETE FROM doctor WHERE doctor_id = $1 RETURNING *', [doctor_id]);
    return rows[0]; 
};