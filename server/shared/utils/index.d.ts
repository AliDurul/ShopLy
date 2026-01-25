import { ApiResponse, ServiceError } from "../types";
export declare function createApiResponse<T>(success: boolean, data?: T, message?: string, error?: string): ApiResponse<T>;
export declare function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T>;
export declare function createErrorResponse(error: string): ApiResponse;
export declare function createServiceError(message: string, statusCode?: number, code?: string, details?: any): ServiceError;
export declare function sanitizeInput(input: string): string;
export declare function isValidUUID(uuid: string): boolean;
export declare function parseEnvInt(value: string | undefined, defaultValue: number): number;
export declare function corsOptions(): {
    origin: string;
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];
};
//# sourceMappingURL=index.d.ts.map