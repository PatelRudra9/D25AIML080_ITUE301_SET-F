export default function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  const status = error.status === 400 || error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500;
  const message = status === 400 ? error.message : 'An unexpected server error occurred.';
  console.error(`[ERROR] ${req.method} ${req.path}: ${error.message}`);

  return res.status(status).json({
    error: {
      code: status === 400 ? 'BAD_REQUEST' : 'INTERNAL_SERVER_ERROR',
      message,
    },
  });
}
