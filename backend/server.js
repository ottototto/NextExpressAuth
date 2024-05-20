const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

// Registration route
app.post('/api/register', async (req, res) => {
    const { email, password, features, accountType } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password, features, accountType) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, JSON.stringify(features), accountType]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ error: error.message });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user: user.rows[0] });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ error: error.message });
    }
});

// Pet routes
app.post('/api/pets', async (req, res) => {
    const { owner_id, name, type, age, notes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pets (owner_id, name, type, age, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [owner_id, name, type, age, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/pets/:owner_id', async (req, res) => {
    const { owner_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pets WHERE owner_id = $1', [owner_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
