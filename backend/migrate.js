// backend/migrate.js
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const migrate = async () => {
    const sql = fs.readFileSync('./db/database.sql', 'utf8');
    try {
        await pool.query(sql);
        console.log('Database migration completed successfully');
    } catch (error) {
        console.error('Error during database migration:', error);
    } finally {
        await pool.end();
    }
};

migrate();