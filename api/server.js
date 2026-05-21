const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'admin_brick_car',
    host: 'localhost',
    database: 'brick-car',
    password: 'brick-car',
    port: 5432,
});

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

app.get('/api/cars', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/cars/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Carro não encontrado' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

app.post('/api/favorites', async (req, res) => {
    const { car_id } = req.body;
    try {
        await pool.query('INSERT INTO favorites (car_id) VALUES ($1)', [car_id]);
        res.status(201).json({ message: 'Favoritado!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/favorites', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.* FROM cars c 
            JOIN favorites f ON c.id = f.car_id
        `);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/favorites/:car_id', async (req, res) => {
    const { car_id } = req.params;
    try {
        await pool.query('DELETE FROM favorites WHERE car_id = $1', [car_id]);
        res.status(200).json({ message: 'Desfavoritado!' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/favorites/check/:car_id', async (req, res) => {
    const { car_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM favorites WHERE car_id = $1', [car_id]);
        // Retorna true se houver registro, false caso contrário
        res.json({ isFavorite: result.rows.length > 0 });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});