# Dockerfile - Node.js runtime with NPM as package manager

ARG NODE_VERSION=24.11.0-alpine

FROM node:${NODE_VERSION} AS base

# =====================================================
# Stage 1: Dependencies Installation Stage
# =====================================================
FROM base AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files (NPM) first to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install project dependencies with frozen lockfile for reproducible builds (NPM)
RUN --mount=type=cache,id=npm,target=/root/.npm \
    npm ci --prefer-offline

# =====================================================
# Stage 2: Build Next.js application in standalone mode
# =====================================================

FROM base AS builder

# Set working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Set build-time environment variables

ENV NODE_ENV=production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN npm run build

# =====================================================
# Stage 3: Run Next.js application
# =====================================================

FROM base AS runner

# Set working directory
WORKDIR /app

# Set run-time environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the run time.
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy production assets
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./standalone/
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# If you want to persist the fetch cache generated during the build so that
# cached responses are available immediately on startup, uncomment this line:
# COPY --from=builder --chown=nextjs:nodejs /app/.next/cache ./.next/cache

# Switch to non-root user for security best practices
USER nextjs

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]
