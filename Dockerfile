# Use a Node.js base image
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY ../package.json ./
COPY ../package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY .. .

# Build the application
RUN npm run build

# Start a new stage for production
FROM node:20 AS production

# Set the working directory
WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
