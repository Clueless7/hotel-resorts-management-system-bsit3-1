// Thrown errors at controller are processed by this middleware
const errorHandler = (err, req, res, next) => {
  // Check if there is already a status code. If not, then its server's fault
  const statusCode = res.statusCode ? res.statusCode : 500

  // Send the status code
  res.status(statusCode)

  // Only send the error stack if in development mode
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = {
  errorHandler,
}
