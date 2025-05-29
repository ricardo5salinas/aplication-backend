import { pool } from '../db.js';

export const findAllMeds = async () => {
    const { rows } = await pool.query('SELECT * FROM medication');
    return rows;
};

export const createMed = async ({ name, dosage, category_id }) => {
    const { rows } = await pool.query(
        'INSERT INT medication (name, dosage, category_id) VALUES ($1, $2, $3) RETURNING *',
        [name, dosage, category_id]
    );
    return rows[0];
};

export const updateMed = async (medication_id, medData) => {
    const keys = Object.keys(medData);

    if (keys.length === 0) {
        throw new Error('No fields provided for update');
    }

    // Generar las partes dinámicas del SQL
    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`);
    const values = keys.map((key) => medData[key]);

    // Agregar el ID al final de los valores
    values.push(medication_id);

    const query = `
        UPDATE medication
        SET ${setClauses.join(', ')}
        WHERE medication_id = $${values.length}
        RETURNING *;
    `;

    const { rows } = await pool.query(query, values);
    return rows[0]; // puede ser undefined si no se encuentra
};


export const deleteMed = async (medication_id) => {
    const { rows } = await pool.query(
        'DELETE FROM medicatio WHERE medication_id = $1 RETURNING *',
        [medication_id]
    );
    return rows[0]; // puede ser undefined si no se encuentra
};
