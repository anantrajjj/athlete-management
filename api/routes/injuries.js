const router = require('express').Router();
const db = require('../../db');

// Get all injuries
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM injuries ORDER BY date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new injury record
router.post('/', async (req, res) => {
  const { athlete_id, injury_type, severity, date, recovery_time } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO injuries (athlete_id, injury_type, severity, date, recovery_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [athlete_id, injury_type, severity, date, recovery_time]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
