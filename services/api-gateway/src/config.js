const required = (name, fallback) => {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') throw new Error(`Missing environment variable: ${name}`);
  return value;
};

export const config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: required('JWT_SECRET', 'development-only-change-me'),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100),
  services: {
    identity: process.env.IDENTITY_SERVICE_URL || 'http://identity-service:4001',
    project: process.env.PROJECT_SERVICE_URL || 'http://project-service:4002',
    task: process.env.TASK_SERVICE_URL || 'http://task-service:4003',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:4004'
  }
};
