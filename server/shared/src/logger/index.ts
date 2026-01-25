import pino, { LoggerOptions } from "pino";

let _logger: pino.Logger | null = null;

export const createLogger = (options: LoggerOptions = {}): pino.Logger => {
  _logger = pino({
    level: process.env.LOG_LEVEL || "info",
    ...options,
  });
  return _logger;
};

export const getLogger = (): pino.Logger => {
  if (!_logger) {
    _logger = createLogger();
  }
  return _logger;
};

export type Logger = pino.Logger;