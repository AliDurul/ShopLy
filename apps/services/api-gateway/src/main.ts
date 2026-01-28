import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import proxyRoutes from './routes/index';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Service registry
const services = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:8001',
  users: process.env.USER_SERVICE_URL || 'http://localhost:8002',
};

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'OK',
    gateway: 'api-gateway',
    timestamp: new Date().toISOString(),
    services: Object.keys(services)
  };
  res.json(health);
});

// Proxy routes
app.use(proxyRoutes);

// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const server = app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
  console.log('Available routes:');
  Object.entries(services).forEach(([service, url]) => {
    console.log(`  /api/${service} -> ${url}`);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});