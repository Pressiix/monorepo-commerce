# README.md for Blog Monorepo

# Blog Monorepo

This project is a monorepo setup using Turbo Repo that contains both a frontend and a backend application for an online blog posting platform. Users can create, view, and manage blog posts, as well as log in with mock credentials.

## Project Structure

```
blog-monorepo
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

The frontend is built with Next.js and provides a user interface for interacting with the blog posts.

### Key Features

- Create new blog posts
- View a list of blog posts
- Responsive design

### Running the Frontend

1. Navigate to the `apps/frontend` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Backend

The backend is built with Nest.js and provides a RESTful API for managing blog posts and user authentication.

### Key Features

- CRUD operations for blog posts
- User authentication with mock credentials

### Running the Backend

1. Navigate to the `apps/backend` directory.
2. Install dependencies: `npm install`
3. Start the server: `npm run start`

## Docker Setup

This project includes Docker support for both the frontend and backend applications, as well as a PostgreSQL database.

### Running with Docker

1. Ensure Docker is installed and running.
2. Run the following command to start all services:
   ```
   docker-compose up
   ```

## Docker Support

This project includes Docker support for easy development and deployment.

### Docker Commands

- Build the image: `docker build -t community-board-web .`
- Run the container: `docker run -p 3000:3000 community-board-web`
- Run with environment variables: `docker run -p 3000:3000 -e ENV_NAME=value community-board-web`

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

## Make Commands

The project includes a Makefile for common development tasks:

```bash
# Build the application
make build
```
