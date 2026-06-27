require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/books');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check (useful for Kubernetes liveness/readiness probes)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'book-tracker-backend' });
});

// Routes
app.use('/api/books', bookRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Connect to DB, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
