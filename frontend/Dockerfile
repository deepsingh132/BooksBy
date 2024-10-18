FROM node:lts-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} 
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENV PORT=80
# ENV HOSTNAME="0.0.0.0"
CMD ["nginx", "-g", "daemon off;"]