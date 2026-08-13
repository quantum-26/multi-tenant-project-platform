import jwt from 'jsonwebtoken';

export function authenticate(jwtSecret) {
  return (req, res, next) => {
    const header = req.get('authorization');
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
    }
    try {
      req.auth = jwt.verify(header.slice(7), jwtSecret);
      next();
    } catch {
      res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid or expired access token' } });
    }
  };
}
