# Multi-stage production image (Next.js output file tracing / standalone).
# See: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

ARG NODE_VERSION=20-bookworm-slim

# -----------------------------------------------------------------------------
# Stage 1: install dependencies (cached when lockfile unchanged)
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps

WORKDIR /app

ENV HUSKY=0

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 2: build (public env vars inlined here)
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

ENV HUSKY=0

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_BACKEND_URI
ENV NEXT_PUBLIC_BACKEND_URI=${NEXT_PUBLIC_BACKEND_URI}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NODE_ENV=production

RUN --mount=type=cache,target=/app/.next/cache \
    pnpm run build

# -----------------------------------------------------------------------------
# Stage 3: minimal runtime (no node_modules, no source — only traced output)
# -----------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
