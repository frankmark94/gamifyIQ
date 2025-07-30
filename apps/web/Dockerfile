# Development Dockerfile for Web
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/*/package*.json ./packages/*/

RUN npm ci

# Copy source code
COPY . .

# Build shared packages
RUN npm run build --workspace=packages/utils

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]