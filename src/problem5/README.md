# CRUD Server with ExpressJS and TypeScript

A robust backend server built with ExpressJS and TypeScript that provides a complete CRUD (Create, Read, Update, Delete) interface for managing resources. The application uses SQLite for data persistence and includes comprehensive error handling, logging, and security features.

## Features

- ✅ **Complete CRUD Operations**: Create, Read, Update, Delete resources
- ✅ **Advanced Filtering**: Filter resources by category, status, and search terms
- ✅ **Pagination**: Built-in pagination support for large datasets
- ✅ **TypeScript**: Full TypeScript support with strict type checking
- ✅ **SQLite Database**: Lightweight database with automatic schema creation
- ✅ **Security**: Helmet.js for security headers, CORS support
- ✅ **Logging**: Morgan middleware for request logging
- ✅ **Error Handling**: Comprehensive error handling and validation
- ✅ **Health Check**: Built-in health check endpoint

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd src/problem5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with hot-reload using ts-node-dev.

### Production Mode
```bash
npm run build
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Resources API

#### 1. Create Resource
```http
POST /api/resources
Content-Type: application/json

{
  "name": "Sample Resource",
  "description": "This is a sample resource",
  "category": "technology",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Sample Resource",
    "description": "This is a sample resource",
    "category": "technology",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Resource created successfully"
}
```

#### 2. Get All Resources (with filters)
```http
GET /api/resources?category=technology&status=active&search=sample&limit=10&offset=0
```

**Query Parameters:**
- `category` (optional): Filter by category
- `status` (optional): Filter by status (`active` or `inactive`)
- `search` (optional): Search in name and description
- `limit` (optional): Number of results per page (default: 10)
- `offset` (optional): Number of results to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sample Resource",
      "description": "This is a sample resource",
      "category": "technology",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "hasNext": false,
    "hasPrev": false
  }
}
```

#### 3. Get Resource by ID
```http
GET /api/resources/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Sample Resource",
    "description": "This is a sample resource",
    "category": "technology",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 4. Update Resource
```http
PUT /api/resources/1
Content-Type: application/json

{
  "name": "Updated Resource",
  "status": "inactive"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Resource",
    "description": "This is a sample resource",
    "category": "technology",
    "status": "inactive",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:01.000Z"
  },
  "message": "Resource updated successfully"
}
```

#### 5. Delete Resource
```http
DELETE /api/resources/1
```

**Response:**
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

## Database Schema

The application uses SQLite with the following schema:

```sql
CREATE TABLE resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT CHECK(status IN ('active', 'inactive')) DEFAULT 'active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
src/
├── controllers/          # Request handlers
│   └── resourceController.ts
├── database/            # Database connection and setup
│   └── connection.ts
├── middleware/          # Express middleware
│   └── errorHandler.ts
├── models/             # Data models
│   └── Resource.ts
├── routes/             # API routes
│   └── resourceRoutes.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── app.ts              # Express app configuration
└── index.ts            # Application entry point
```

## Environment Variables

You can configure the application using environment variables:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `CORS_ORIGIN`: CORS origin (default: *)

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

## Testing

You can test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)
- Any HTTP client

Example curl commands:

```bash
# Create a resource
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Resource","description":"Test description","category":"test"}'

# Get all resources
curl http://localhost:3000/api/resources

# Get resource by ID
curl http://localhost:3000/api/resources/1

# Update resource
curl -X PUT http://localhost:3000/api/resources/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Resource"}'

# Delete resource
curl -X DELETE http://localhost:3000/api/resources/1
```

## License

MIT
