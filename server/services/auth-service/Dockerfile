FROM node:20-alpine AS builder

WORKDIR /app/auth-service

# Copy shared folder ../shared
COPY server/shared ../shared
COPY server/auth-service/package*.json ./

RUN yarn install

COPY server/auth-service ./
RUN yarn build

FROM node:20-alpine AS runner

# non-root user
RUN addgroup app && adduser -S -G app app

WORKDIR /app/auth-service

# Copy shared folder for ../shared imports (development)
COPY --chown=app:app --from=builder /app/shared ../shared

# Production files
COPY --chown=app:app --from=builder /app/auth-service/package*.json ./
COPY --chown=app:app --from=builder /app/auth-service/dist ./dist
COPY --chown=app:app --from=builder /app/auth-service/node_modules ./node_modules
COPY --chown=app:app --from=builder /app/auth-service/prisma ./prisma
COPY --chown=app:app --from=builder /app/auth-service/prisma.config.ts ./prisma.config.ts


# Development files (src for ts-node)
COPY --chown=app:app --from=builder /app/auth-service/src ./src
COPY --chown=app:app --from=builder /app/auth-service/tsconfig.json ./

USER app

# EXPOSE 8001
