const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Verify environment variables
console.log('Checking environment variables...');
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Routes
try {
  console.log('Loading routes...');
  app.use('/api/athletes', require('./api/routes/athletes'));
  app.use('/api/performance', require('./api/routes/performance'));
  app.use('/api/injuries', require('./api/routes/injuries'));
  app.use('/api/training', require('./api/routes/training'));
  app.use('/api/finance', require('./api/routes/finance'));
  console.log('Routes loaded successfully');
} catch (error) {
  console.error('Error loading routes:', error);
  process.exit(1);
}

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});