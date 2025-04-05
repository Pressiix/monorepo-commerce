# Use a base image with Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY apps/frontend/package.json ./
RUN npm install

# Copy the Next.js project
COPY apps/frontend ./

# Expose the Next.js default port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
