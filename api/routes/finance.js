const router = require('express').Router();
const db = require('../../db');

// Get all financial records
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM financial_records ORDER BY date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new financial record
router.post('/', async (req, res) => {
  const { athlete_id, transaction_type, amount, category, date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO financial_records (athlete_id, transaction_type, amount, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [athlete_id, transaction_type, amount, category, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
