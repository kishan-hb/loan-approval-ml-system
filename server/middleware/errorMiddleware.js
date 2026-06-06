function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Internal server error';

    return res.status(statusCode).json({
      success: false,
      error: {
        code,
        message,
        details: err.details || null
      },
      timestamp: new Date().toISOString()
    });
  }
  module.exports = errorMiddleware;