FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runtime

RUN apk add --no-cache curl

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=app:app . .

USER app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]