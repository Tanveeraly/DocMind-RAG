# Multi-stage Dockerfile for DocMind Backend
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Production image runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 docmind

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
COPY db ./db

USER docmind

EXPOSE 5000

CMD ["node", "src/index.js"]
