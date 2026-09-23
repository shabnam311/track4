/**
 * Simple request logger middleware.
 * Logs: method, path, status code, and response time in ms.
 */
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;
