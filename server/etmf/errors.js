// Map database errors to safe client responses (never leak internals or stack traces).
export const sendError = (res, err, context = 'eTMF') => {
  if (err?.name === 'ValidationError') {
    return res.status(400).json({ success: false, error: Object.values(err.errors || {}).map(e => e.message).join('; ') || 'Invalid data.' });
  }
  if (err?.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid value supplied.' });
  }
  if (err?.code === 11000) {
    return res.status(409).json({ success: false, error: 'A record with this identifier already exists.' });
  }
  console.error(`[${context}]`, err);
  return res.status(500).json({ success: false, error: 'Internal server error.' });
};
