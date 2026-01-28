import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import proxyRoutes from './routes';
import { createSuccessResponse, createErrorResponse } from '@shared/utils';


async function start() {
    // load environment variables
    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 8000;

    // Middleware
    app.use(helmet({ crossOriginEmbedderPolicy: false }));
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN || "http://localhost:3000",
            credentials: process.env.CORS_CREDENTIALS === "true",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: [
                "Content-Type",
                "Authorization",
                "x-user-id",
                "x-user-email",
            ],
        })
    );


    // Proxy routes
    app.use(proxyRoutes);

    // health check
    app.get('/health', (req, res) => {
        
        
        res.status(200).send(createSuccessResponse({ status: 'OK', timestamp: new Date().toISOString() }, 'API Gateway is healthy'));
    });

    // 404 handler
    app.use('*splat', (req, res, next) => {
        res.status(404).send(createErrorResponse('Route not found'));
    });

    // error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        res.status(500).send(createErrorResponse(err.message || 'Internal Server Error'));
    });


    // start server
    app.listen(PORT, () => {
        console.log(`API Gateway is running on port ${PORT}`);
    });

}

start()

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});