// Express error handler — catches errors passed via next(err)
const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
