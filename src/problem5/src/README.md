# Express CRUD with TypeScript and TypeORM

This project is a simple CRUD API built with Express, TypeScript, and TypeORM, using SQLite as the database.

## Features
- User management (Create, Read, Update, Delete)
- Secure password handling (passwords are hashed and excluded from API responses)
- Pagination support for listing users and scores
- Environment variable support via `dotenv`

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/express-crud-ts.git
   cd express-crud-ts
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and define:
   ```env
   PORT=5000
   ```

4. Run the application:
   ```sh
   npm start
   ```

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a user by ID
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

## Pagination Usage
You can paginate API responses by providing `page` and `limit` query parameters:
```
GET /api/users?page=1&limit=10
```

## Tech Stack
- **Express.js** - Fast and minimalist web framework
- **TypeScript** - Type safety for JavaScript
- **TypeORM** - ORM for database interactions
- **SQLite** - Lightweight database engine

## License
This project is open-source and available under the [MIT License](LICENSE).
