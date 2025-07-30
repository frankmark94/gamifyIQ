# Development Dockerfile for API
FROM node:20-alpine

WORKDIR /app

# Install dependencies for development
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/*/package*.json ./packages/*/

RUN npm ci

# Copy source code
COPY . .

# Build packages
RUN npm run build --workspace=packages/utils
RUN npm run build --workspace=packages/ai-core
RUN npm run build --workspace=packages/db

# Generate Prisma client
RUN npm run generate --workspace=packages/db

WORKDIR /app/apps/api

EXPOSE 4000

CMD ["npm", "run", "dev"]