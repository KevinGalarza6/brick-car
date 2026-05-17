const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: 'admin_brick_car',
    host: 'localhost',
    database: 'brick-car',
    password: 'brick-car',
    port: 5432,
});

// CREATE
app.post('/api/cars', async (req, res) => {
    try {
        const { brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone, imageUrl } = req.body;
        const result = await pool.query(
            'INSERT INTO cars (brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone, imageUrl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone, imageUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (All)
app.get('/api/cars', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (One)
app.get('/api/cars/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Carro não encontrado' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
app.put('/api/cars/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone, imageUrl } = req.body;
        const result = await pool.query(
            'UPDATE cars SET brand=$1, model=$2, year=$3, mileage=$4, transmission=$5, fuelType=$6, color=$7, city=$8, acceptsTrade=$9, price=$10, contactPhone=$11, imageUrl=$12 WHERE id=$13 RETURNING *',
            [brand, model, year, mileage, transmission, fuelType, color, city, acceptsTrade, price, contactPhone, imageUrl, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete('/api/cars/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM cars WHERE id = $1', [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API rodando na porta ${PORT}`);
});