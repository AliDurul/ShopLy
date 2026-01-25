import { getLogger } from "../logger";
import { error as errorResponse } from "../response";

export const requestId = (req: any, _res: any, next: any) => {
  if (!req.id) {
    // Use crypto.randomUUID if available, else timestamp
    const id = (globalThis.crypto && (globalThis.crypto as any).randomUUID)
      ? (globalThis.crypto as any).randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    req.id = id;
  }
  next();
};

export const logRequests = (req: any, res: any, next: any) => {
  const logger = getLogger();
  const start = Date.now();
  logger.info({ id: req.id, method: req.method, url: req.url }, "Request started");
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({ id: req.id, status: res.statusCode, duration }, "Request finished");
  });
  next();
};

export const asyncHandler = (fn: (req: any, res: any, next: any) => Promise<any>) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (err: any, req: any, res: any, _next: any) => {
  const logger = getLogger();
  logger.error({ id: req.id, err }, "Unhandled error");
  const body = errorResponse(err?.message || "Internal Server Error");
  res.status(500).json(body);
};