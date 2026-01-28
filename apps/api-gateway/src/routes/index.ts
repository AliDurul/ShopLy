import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
import { Socket } from "net";

const router = Router();

export const servicesConfig = {
    auth: {
        name: "Auth Service",
        url: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
        healthPath: "/health",
        timeout: 5000,
        retries: 3,
    },
    users: {
        name: "User Service",
        url: process.env.USER_SERVICE_URL || "http://localhost:8002",
        healthPath: "/health",
        timeout: 5000,
        retries: 3,
    },
}

function createServiceProxy(targetUrl: string, pathRewrite: Record<string, string>) {

    const options = {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: pathRewrite || {},
        timeout: 5000,
        proxyTimeout: 5000,
        on: {
            error: (err: any, req: Request, res: Response | Socket) => {
                console.log(err);
                console.error(`Error proxying request to ${targetUrl}:`, err.message);
                if (res instanceof Socket) return;
                res.status(500).json({ error: 'Service unavailable' });
            },
            proxyReq: (proxyReq: any, req: Request, _res: Response) => {
                console.log(`Proxy request to ${targetUrl} - ${req.method} ${req.originalUrl}`);
                // Add headers for tracing
                proxyReq.setHeader('x-request-id', req.headers['x-request-id'] || Date.now().toString());
                proxyReq.setHeader('x-original-ip', req.ip || req.connection.remoteAddress || '');
                // // Forward user info if available
                // if (req.user) {
                //     proxyReq.setHeader('x-user-id', req.user.id);
                //     proxyReq.setHeader('x-user-email', req.user.email);
                // }
            },
        }
    }

    return createProxyMiddleware(options);
}

router.use('/api/auth', createServiceProxy(servicesConfig.auth.url, { '^/api/auth': '/' }));

router.use('/api/users', createServiceProxy(servicesConfig.users.url, { '^/api/users': '' }));

export default router;

