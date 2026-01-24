import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { corsOptions, createErrorResponse, createSuccessResponse } from '@shared/utils';
import { Request, Response, NextFunction } from 'express';


async function start() {
    // load environment variables
    dotenv.config();

    const app = express();
    const PORT = process.env.PORT || 8001;

    // Middleware
    app.use(helmet());
    app.use(express.json());
    app.use(cors(corsOptions()));
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true }));


    // health check
    app.get('/health', (req, res) => {
        res.status(200).send(createSuccessResponse({ status: 'OK', timestamp: new Date().toISOString() }, 'Auth-service is healthy'));
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
        console.log(`Auth-service is running on port ${PORT}`);
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