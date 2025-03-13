const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'healthy' });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Athletes endpoints
app.get('/api/athletes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM athletes ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch athletes' });
  }
});

app.post('/api/athletes', async (req, res) => {
  const { name, age, sport, level } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO athletes (name, age, sport, level) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, sport, level]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create athlete' });
  }
});

// Performance metrics endpoints
app.get('/api/athletes/:id/performance', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM performance_metrics WHERE athlete_id = $1 ORDER BY date DESC',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch performance metrics' });
  }
});

app.post('/api/performance', async (req, res) => {
  const { athlete_id, metric_name, value, date, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO performance_metrics (athlete_id, metric_name, value, date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [athlete_id, metric_name, value, date, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create performance metric' });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});