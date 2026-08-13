import express from 'express';
import { config } from './config.js';
import { correlationId } from './correlation.js';
import { requestLogger } from './logger.js';
import { authenticate } from './auth.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(correlationId);
app.use(requestLogger);

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', service: 'api-gateway' }));
app.get('/readiness', (_req, res) => res.status(200).json({ status: 'ready', service: 'api-gateway' }));

app.use('/api/v1', authenticate(config.jwtSecret), (_req, res) => {
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'API routes are introduced with their owning service' } });
});

app.use((_req, res) => res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }));

app.use((err, req, res, _next) => {
  console.error(JSON.stringify({ event: 'http_error', message: err.message, correlationId: req.correlationId }));
  res.status(err.statusCode || 500).json({ success: false, error: { code: err.code || 'INTERNAL_SERVER_ERROR', message: err.statusCode ? err.message : 'Internal server error' } });
});

app.listen(config.port, '0.0.0.0', () => console.log(JSON.stringify({ event: 'gateway_started', port: config.port })));
