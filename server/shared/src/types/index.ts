export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export type RabbitMQMessage<T = unknown> = {
  routingKey: string;
  exchange?: string;
  data: T;
  timestamp?: number;
};

// Domain types used across services
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  preferences?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileRequest {
  id: string;
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  preferences?: Record<string, any>;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  userId: string;
  updatedAt: Date;
}

export interface CreateTagRequest {
  name: string;
  color?: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tagIds?: string[];
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  tagIds?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export class ServiceError extends Error {
  statusCode: number;
  code?: string;
  details?: any;

  constructor(message: string, statusCode: number = 500, code?: string, details?: any) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// Express request augmentation
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}