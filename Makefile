.PHONY: dev dev-down dev-logs install clean

# Start development environment
dev:
	docker-compose -f docker-compose.yml up --build

# Stop development environment
dev-down:
	docker-compose -f docker-compose.yml down

# Show development logs
dev-logs:
	docker compose -f docker-compose.yml logs -f

# Install dependencies
install:
	npm install
