FROM node:lts-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM base AS runner
WORKDIR /app
COPY --from=builder /app ./
ARG FRONTEND_URL
ENV FRONTEND_URL=${FRONTEND_URL}

EXPOSE 5000

RUN chown -R node /app

USER node
CMD ["node", "app.js"]