import pg from 'pg';
export const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'Proyecto-Lenguaje',
    port: '5432',
    client_encoding: 'UTF8',
});
