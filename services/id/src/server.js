import express from 'express';
const app = express();
const port = Number(process.env.PORT || 4001);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/readiness', (_req, res) => res.json({ status: 'ready' }));
app.listen(port, '0.0.0.0');
