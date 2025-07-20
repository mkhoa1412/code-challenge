# Resource Management API

A RESTful CRUD API built with TypeScript, Express.js, and MySQL for managing resources with comprehensive filtering and validation.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, Delete resources with proper validation
- **MySQL Database**: Persistent data storage with connection pooling
- **CQRS Pattern**: Separation of read and write operations for better scalability
- **Request Validation**: Input validation using class-validator with custom DTOs
- **Docker Support**: Containerized application and database
- **Swagger Documentation**: Interactive API documentation with OpenAPI 3.0
- **Logging**: Structured logging with Winston and different log levels
- **Global Error Handling**: Centralized error handling with custom error types
- **Async Error Catching**: Automatic async error handling without try-catch boilerplate

## 🚀 Quick Start

1. **Run the application:**
   ```bash
   docker-compose up -d
   ```

2. **Access the API documentation:**
   - Open your browser and go to: http://localhost:3000/api-docs/

That's it! The API will be running and you can explore all endpoints through the interactive Swagger documentation.

## 🗄️ Database Initialization

The database is automatically initialized on first run with:
- **Database & Tables**: Creates `resources_db` database and `resources` table
- **Sample Data**: Inserts 3 sample resources for testing
- **Indexes**: Optimized indexes for better query performance

### Reset Database (if needed):
```bash
# Stop containers and remove database volume
docker-compose down -v

# Start fresh (will re-run init.sql)
docker-compose up -d
```

