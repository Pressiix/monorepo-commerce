# Use an official Go image as the base
FROM golang:1.23.5

# Install Air for hot reloading
RUN go install github.com/air-verse/air@latest

# Set the working directory
WORKDIR /app

# Copy the Air configuration file
COPY apps/backend/air*.toml ./

# Copy only backend source code
COPY apps/backend ./

# Install dependencies
RUN go mod download
ENV PORT=3001

# Expose port 3001
EXPOSE 3001

# Use Air for hot reloading
CMD ["air"]
