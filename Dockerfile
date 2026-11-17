# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Expose port 3000 to the host network
EXPOSE 3000

# Command to run the Node.js application
CMD ["node", "server.js"]

