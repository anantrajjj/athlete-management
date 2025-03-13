const router = require('express').Router();
const db = require('../../db');

// Get all athletes
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM athletes ORDER BY name'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new athlete
router.post('/', async (req, res) => {
  const { name, age, sport, level } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO athletes (name, age, sport, level) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, age, sport, level]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
