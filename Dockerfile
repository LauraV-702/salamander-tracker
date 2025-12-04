# Install dependencies
FROM node:18 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build the Next.js app
FROM node:18 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Run the production server
FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
