const router = require('express').Router();
const db = require('../../db');

// Get all performance metrics
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM performance_metrics ORDER BY date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new performance metric
router.post('/', async (req, res) => {
  const { athlete_id, metric_name, value, date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO performance_metrics (athlete_id, metric_name, value, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [athlete_id, metric_name, value, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
