# README.md for Monorepo

This project is a monorepo setup using Turbo Repo that contains both a frontend and a backend application for an online e-commerce platform. Users can view available tickets in store and can add/remove items from the cart

## Project Structure

```
monorepo-commerce
├── apps
│   ├── frontend
│   └── backend
├── docker
├── docker-compose.yml
├── turbo.json
├── package.json
└── README.md
```

## Frontend

The frontend is built with Next.js and provides a user interface for interacting with the ticket list page.

### Key Features

- Show ticket list
- Add / Remove tickets to cart
- Responsive design
- Search Tickets
- Sorting ticket list
- Apply coupon code
- Redux Persist to store data in a local storage
- Can build Docker Image

## Backend

The backend is built with Golang and provides a RESTful API for searching tickets and discount for any coupon code.

### Key Features

- Implement [Air](https://github.com/air-verse/air) - Live reload for Go apps
- Get Ticket list
- Search Ticket List
- Get discount info from coupon code
- Can build Docker Image

## Docker Setup

This project includes Docker support for both the frontend and backend applications

# Prerequisite for local development

1. You need to install Node.js and Golang first
2. Ensure the CLI is available by running this command

```
# check node available
node --version

# check golang available
go
```

3. You need to install [Air](https://github.com/air-verse/air) - Live reload for Go apps

```
curl -sSfL https://raw.githubusercontent.com/air-verse/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
```

4. Ensure the Air CLI is available

```
air --help
```

5. Install Turbo CLI

```
npm install turbo --global
```

## How to run this project (Local Development)

### Method 1 : Running with Docker (Recommend)

1. Ensure Docker is installed and running.
2. Run the following command to start all services from the root folder:

   ```
   docker-compose -f docker-compose.yml up --build
   ```

   or

   ```
   npm run docker-dev
   ```

### Method 2 : Running with NPM

```
nom run dev
```

## Docker Support

This project includes Docker support for easy development and deployment.

### Docker Compose

Use Docker Compose for a more streamlined development experience:

```bash
# Start the application
docker-compose up

# Run in detached mode
docker-compose up -d

# Stop the application
docker-compose down
```
