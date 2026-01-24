import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
import { Socket } from "net";
import { createErrorResponse } from "../../../shared/utils";
import { servicesConfig } from "@/config/services";

const router = Router();

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
                res.status(500).json(createErrorResponse('Service unavailable'));
            },
            proxyReq: (proxyReq: any, req: Request, res: Response) => {
                console.log(`Proxy request to ${targetUrl} - ${req.method} ${req.originalUrl}`);

                // // Forward user info if available
                // if (req.user) {
                //     proxyReq.setHeader('x-user-id', req.user.id);
                //     proxyReq.setHeader('x-user-email', req.user.email);
                // }
            },
            proxyRes: (proxyRes: any, req: any) => {
                // proxy response details
                console.log(`Received response from ${targetUrl}: ${proxyRes.statusCode} for ${req.method} ${req.originalUrl}`);
            },
        }
    }

    return createProxyMiddleware(options);
}

router.use('/api/auth', createServiceProxy(servicesConfig.auth.url, { '^/api/auth': '' }));

router.use('/api/users', createServiceProxy(servicesConfig.users.url, { '^/api/users': '' }));

export default router;