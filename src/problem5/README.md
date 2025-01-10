# CRUD API with Express.js, Sequelize, and TypeScript

This project is a backend API built using Express.js, Sequelize, and TypeScript. It follows a clean architecture with layers for controllers, services, repositories, and migrations. The API provides CRUD functionality for managing resources.

---

## Project Structure

```plaintext
src/
├── config/
│   └── database.ts           # Sequelize database configuration
├── controllers/
│   └── ResourceController.ts # Handles HTTP requests and responses
├── models/
│   └── Resource.ts           # Sequelize model definition
├── repositories/
│   └── ResourceRepository.ts # Repository for data access
├── routes/
│   └── ResourceRoutes.ts     # Defines routes for the Resource entity
├── services/
│   └── ResourceService.ts    # Handles business logic
└── index.ts                  # Main entry point for the application
```

---

## Features

1. **Create a Resource**: Add a new resource with a name and description.
2. **List Resources**: Retrieve all resources with optional filters (e.g., by name).
3. **Get Resource Details**: Retrieve details of a specific resource by ID.
4. **Update Resource**: Modify the details of an existing resource.
5. **Delete Resource**: Remove a resource by ID.

---

## Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- A database (PostgreSQL)

---

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure the `.env` file**:

   Create a `.env` file in the root directory and add the following content:

   ```plaintext
   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   DB_DIALECT=postgres

   # Application settings
   PORT=3000
   NODE_ENV=development
   ```

   Replace the placeholder values (`your_username`, `your_password`, etc.) with your actual database credentials.

4. **Start the development server**:

   ```bash
   npm run start
   ```

   The server will run at `http://localhost:3000`.

---

## API Endpoints

### Resource Endpoints

- **POST** `/resources`
  - Create a new resource.
  - Request Body:
    ```json
    {
      "name": "Resource Name",
      "description": "Resource Description"
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "name": "Resource Name",
      "description": "Resource Description"
    }
    ```

- **GET** `/resources`
  - Retrieve a list of resources.
  - Query Parameters:
    - `name` (optional): Filter by name substring.
  - Response:
    ```json
    [
      {
        "id": 1,
        "name": "Resource Name",
        "description": "Resource Description"
      }
    ]
    ```

- **GET** `/resources/:id`
  - Retrieve details of a specific resource by ID.
  - Response:
    ```json
    {
      "id": 1,
      "name": "Resource Name",
      "description": "Resource Description"
    }
    ```

- **PUT** `/resources/:id`
  - Update an existing resource.
  - Request Body:
    ```json
    {
      "name": "Updated Name",
      "description": "Updated Description"
    }
    ```
  - Response:
    ```json
    {
      "id": 1,
      "name": "Updated Name",
      "description": "Updated Description"
    }
    ```

- **DELETE** `/resources/:id`
  - Delete a resource by ID.
  - Response: HTTP 204 No Content

---

## Scripts

- **Start the server**: `npm run start`

---

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **TypeScript**: Adds static typing to JavaScript.
- **Sequelize**: ORM for database interactions.

---

## Notes

- Update the database connection in `src/config/database.ts` before deploying to production.
- Add environment variable management using tools like `dotenv` for sensitive configurations.

---
