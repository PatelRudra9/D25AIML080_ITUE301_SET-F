import jwt from 'jsonwebtoken';

export default function authGuard(req, res, next) {
  const authorization = req.get('Authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'A valid Bearer token is required.' } });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { attendeeId: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'The token is invalid or expired.' } });
  }
}
