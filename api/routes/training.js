const router = require('express').Router();
const db = require('../../db');

// Get all training plans
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM training_plans ORDER BY date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new training plan
router.post('/', async (req, res) => {
  const { athlete_id, exercise, sets, reps, date, notes } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO training_plans (athlete_id, exercise, sets, reps, date, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [athlete_id, exercise, sets, reps, date, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
