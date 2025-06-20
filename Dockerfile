# Use official Node.js LTS image
FROM node:20-slim as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript (if applicable)
RUN npm run build


# Use a smaller image for production
FROM node:20-slim
# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY package.json ./

RUN npm i dotenv

COPY --from=builder /app/dist .
