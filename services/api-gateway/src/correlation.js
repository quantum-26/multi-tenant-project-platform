import crypto from 'node:crypto';

export function correlationId(req, res, next) {
  const incoming = req.get('x-correlation-id');
  const id = incoming && incoming.length <= 128 ? incoming : crypto.randomUUID();
  req.correlationId = id;
  res.setHeader('x-correlation-id', id);
  next();
}
