declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export declare class ServiceError extends Error {
    statusCode: number;
    code?: string;
    details?: any;
    constructor(message: string, statusCode?: number, code?: string, details?: any);
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
}
//# sourceMappingURL=index.d.ts.map