import { ApiResponse, ServiceError } from "../types";

export function createApiResponse<T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
): ApiResponse<T> {
  return {
    success,
    data,
    message,
    error,
  };
}

export function createSuccessResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  return createApiResponse(true, data, message);
}

export function createErrorResponse(error: string): ApiResponse {
  return createApiResponse(false, undefined, undefined, error);
}

export function createServiceError(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): ServiceError {
  return new ServiceError(message, statusCode, code, details);
}

// Sanitize user input data to prevent XSS and other attacks
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // remove < and > characters
    .trim(); // trim whitespace
}

export function isValidUUID(uuid: string): boolean {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
}

export function parseEnvInt(
  value: string | undefined,
  defaultValue: number
): number {
  if (!value) return defaultValue;
  const parsedValue = parseInt(value, 10);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

// cors 
export function corsOptions() {
  return {
    origin: "*",
    credentials: process.env.CORS_CREDENTIALS === "true",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", 'X-Internal-Request'],
  };
}