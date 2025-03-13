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

// Career prediction endpoint
app.get('/api/athletes/:id/career-prediction', async (req, res) => {
  try {
    // Get athlete data
    const athlete = await pool.query('SELECT * FROM athletes WHERE id = $1', [req.params.id]);
    if (athlete.rows.length === 0) {
      return res.status(404).json({ error: 'Athlete not found' });
    }

    // Get performance data
    const performance = await pool.query(
      'SELECT AVG(value) as avg_performance, STDDEV(value) as performance_std FROM performance_metrics WHERE athlete_id = $1',
      [req.params.id]
    );

    // Get training consistency
    const training = await pool.query(
      'SELECT COUNT(*) as training_count FROM training_records WHERE athlete_id = $1',
      [req.params.id]
    );

    // Get injury history
    const injuries = await pool.query(
      'SELECT COUNT(*) as injury_count FROM injury_records WHERE athlete_id = $1',
      [req.params.id]
    );

    // Calculate prediction score
    const baseScore = 70;
    let score = baseScore;

    const perfAvg = performance.rows[0].avg_performance || 0;
    const perfStd = performance.rows[0].performance_std || 0;
    const trainingCount = training.rows[0].training_count || 0;
    const injuryCount = injuries.rows[0].injury_count || 0;

    score += Math.min(perfAvg * 0.5, 15);
    score -= Math.min(perfStd * 0.3, 10);
    score += Math.min(trainingCount * 0.2, 10);
    score -= Math.min(injuryCount * 2, 15);
    score = Math.max(Math.min(score, 100), 0);

    // Generate career paths
    const careerPaths = [];
    if (score >= 85) {
      careerPaths.push("Professional Athlete", "Elite Competition");
    } else if (score >= 70) {
      careerPaths.push("Semi-Professional", "Regional Competition");
    } else if (score >= 50) {
      careerPaths.push("Amateur Competition", "Local Leagues");
    } else {
      careerPaths.push("Recreational Sports", "Fitness Focus");
    }

    res.json({
      athlete_name: athlete.rows[0].name,
      potential_score: Math.round(score * 10) / 10,
      career_paths: careerPaths,
      factors: {
        performance_level: Math.round(perfAvg * 100) / 100,
        consistency: Math.round(perfStd * 100) / 100,
        training_dedication: trainingCount,
        injury_risk: injuryCount
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate career prediction' });
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