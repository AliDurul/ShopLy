"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = void 0;
class ServiceError extends Error {
    constructor(message, statusCode = 500, code, details) {
        super(message);
        this.name = "ServiceError";
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServiceError);
        }
    }
}
exports.ServiceError = ServiceError;
//# sourceMappingURL=index.js.map