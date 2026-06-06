function notFound(req, res, next) {
  return next({
    statusCode: 404,
    code: 'NOT_FOUND',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    details: null
  });
}

module.exports = notFound;
