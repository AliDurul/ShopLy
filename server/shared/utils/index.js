"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiResponse = createApiResponse;
exports.createSuccessResponse = createSuccessResponse;
exports.createErrorResponse = createErrorResponse;
exports.createServiceError = createServiceError;
exports.sanitizeInput = sanitizeInput;
exports.isValidUUID = isValidUUID;
exports.parseEnvInt = parseEnvInt;
exports.corsOptions = corsOptions;
const types_1 = require("../types");
function createApiResponse(success, data, message, error) {
    return {
        success,
        data,
        message,
        error,
    };
}
function createSuccessResponse(data, message) {
    return createApiResponse(true, data, message);
}
function createErrorResponse(error) {
    return createApiResponse(false, undefined, undefined, error);
}
function createServiceError(message, statusCode = 500, code, details) {
    return new types_1.ServiceError(message, statusCode, code, details);
}
function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, "")
        .trim();
}
function isValidUUID(uuid) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
}
function parseEnvInt(value, defaultValue) {
    if (!value)
        return defaultValue;
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
}
function corsOptions() {
    return {
        origin: "*",
        credentials: process.env.CORS_CREDENTIALS === "true",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", 'X-Internal-Request'],
    };
}
//# sourceMappingURL=index.js.map