import type { ApiResponse, PaginationMeta } from "../types";

export const ok = <T>(data: T, message?: string, meta?: PaginationMeta): ApiResponse<T> => ({
  success: true,
  message,
  data,
  ...(meta ? { errors: undefined } : {}),
});

export const created = <T>(data: T, message = "Created"): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

export const error = (message = "Error"): ApiResponse<never> => ({
  success: false,
  message,
  error: message,
});

export const paginateMeta = (page: number, pageSize: number, total: number): PaginationMeta => ({
  page,
  pageSize,
  total,
  totalPages: Math.max(1, Math.ceil(total / Math.max(1, pageSize))),
});