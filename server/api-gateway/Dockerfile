FROM node:20-alpine AS builder

WORKDIR /app/api-gateway

# Copy shared folder to match relative import path ../shared
COPY server/shared ../shared
COPY server/api-gateway/package*.json ./

RUN yarn install

COPY server/api-gateway ./

RUN yarn build

FROM node:20-alpine AS runner

# non-root user
RUN addgroup app && adduser -S -G app app

WORKDIR /app/api-gateway

# Copy shared folder 
COPY --chown=app:app --from=builder /app/shared ../shared

# Production files
COPY --chown=app:app --from=builder /app/api-gateway/package*.json ./
COPY --chown=app:app --from=builder /app/api-gateway/dist ./dist
COPY --chown=app:app --from=builder /app/api-gateway/node_modules ./node_modules

# Development files (src for ts-node)
COPY --chown=app:app --from=builder /app/api-gateway/src ./src
COPY --chown=app:app --from=builder /app/api-gateway/tsconfig.json ./

USER app

EXPOSE 8000

# CMD ["yarn", "start"]
CMD ["yarn", "dev"]