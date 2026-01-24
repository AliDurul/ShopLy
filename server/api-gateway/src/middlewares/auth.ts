import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../../../shared/utils";
import jwt from "jsonwebtoken";


const publicRoutes = [
    "/health",
    "/status",
    "/",
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/refresh",
];

function isPublicRoute(path: string): boolean {
    return publicRoutes.includes(path);
}

export function gatewayAuth(req: Request, res: Response, next: NextFunction): void {
    // Skip authentication for public routes
    if (isPublicRoute(req.path)) {
        next();
        return;
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json(createErrorResponse("Access token required"));
        return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET not configured in API Gateway");
        res.status(500).json(createErrorResponse("Server configuration error"));
        return;
    }

    jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
        if (err) {
            res.status(403).json(createErrorResponse("Invalid or expired token"));
            return;
        }

        // user info 
        req.user = decoded;

        // user info to headers
        req.headers["x-user-id"] = decoded.userId;
        req.headers["x-user-email"] = decoded.email;

        next();
    });
}