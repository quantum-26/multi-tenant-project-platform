import express from 'express';
const app = express();
const port = Number(process.env.PORT || 4000);
app.disable('x-powered-by');
app.use(express.json());
app.get('/health', function (_req, res) { res.status(200).json({ status: 'ok', service: 'api-gateway' }); });
app.get('/readiness', function (_req, res) { res.status(200).json({ status: 'ready', service: 'api-gateway' }); });
app.use(function (_req, res) { res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }); });
app.listen(port, '0.0.0.0');
