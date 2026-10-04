// Minimal in-memory rate limiter (per IP, fixed window)
export const rateLimit = ({ windowMs, max, message = 'Too many requests. Please try again later.' }) => {
  const hits = new Map();
  setInterval(() => hits.clear(), windowMs).unref();
  return (req, res, next) => {
    const count = (hits.get(req.ip) || 0) + 1;
    hits.set(req.ip, count);
    if (count > max) {
      return res.status(429).json({ success: false, error: message });
    }
    next();
  };
};
