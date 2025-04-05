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

## Frontend (Next.js)

The frontend is built with Next.js and provides a user interface for interacting with the ticket list page.

### Key Features

- Responsive and support mobile size
- Show ticket list
- Add / Remove tickets to cart
- Search Tickets
- Sorting ticket list
- Apply coupon code
- Use Redux Persist to store data in a local storage
- Unit test for calculation logic, Cart component and UI snapshot using Jest
- Can build Docker Image

## Backend (Go)

The backend is built with Golang and provides a RESTful API for searching tickets and discount for any coupon code.

### Key Features

- Implement [Air](https://github.com/air-verse/air) - Live reload for Go apps
- Get Ticket list from API (read data from json files)
- Search Ticket List from API (read data from json files)
- Get discount info by coupon code from API (read data from json files)
- Can build Docker Image

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
npm run dev
```

## Access Apps
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## how to run unit test

```
npm run test
```
