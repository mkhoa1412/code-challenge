# Description

This is repo running with NodeJS

## Setup

**Requirement**:

- node >= 21.5.0
- docker >= 24.0.7
- docker-compose: >= v2.23.3-desktop.2
- npm => 10.7.0

## To run this API locally, follow these steps:

1. Clone this repository.
2. make build_application
3. Install dependencies using npm install.
4. npm run watch.
5. npm run start

#### Note: If you see this error Error: `Connection lost: The server closed the connection.`

Please wait for the initial database setup to complete.
Afterward, you can re-run the command `npm run start` to restart the application.

6. The API will be accessible at http://localhost:3000.

## Documentation API

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /users      | Get all users     |
| GET    | /users/{id} | Get user by ID    |
| POST   | /users      | Create a new user |
| POST   | /users/{id} | Update user by ID |
| DELETE | /users/{id} | Delete user by ID |

# GET /users

Retrieves a list of all users.

# GET /users/{id}

Retrieves a specific user by their unique identifier (uuid).

# POST /users

Creates a new user. Requires a JSON object representing the user in the request body with the following fields:

firstName (string)
lastName (string)
email (string)
password (string)

# PUT /users/{id}

Updates an existing user with the specified ID. Requires a JSON object representing the updated user in the request body with the following fields:

firstName (string)
lastName (string)
email (string)
password (string)

# DELETE /users/{id}

Deletes a user with the specified ID.
