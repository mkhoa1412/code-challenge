# Express TypeScript CRUD API

## Overview
This project is a simple CRUD (Create, Read, Update, Delete) API built with Express, TypeScript, and MongoDB. It allows you to manage user records, including creating, retrieving, updating, and deleting users.

## Features
- Create a user
- Retrieve all users
- Retrieve a single user by ID
- Update user information
- Delete a user

## Technologies Used
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (with Mongoose)
- **dotenv** for environment variables

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDb using atlab




### Running the Server
```sh
npm run dev
```
The server will start at `http://localhost:5000`.

## API Endpoints

### 1. Get all users
```sh
curl -X GET http://localhost:5000/api/users
```

### 2. Get a user by ID
```sh
curl -X GET http://localhost:5000/api/users/{id}
```
Example:
```sh
curl -X GET http://localhost:5000/api/users/67b01378840b6f9aa92115c3
```

### 3. Create a new user
```sh
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "age": 30, "email": "johndoe@example.com"}'
```

### 4. Update a user
```sh
curl -X PUT http://localhost:5000/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "age": 32, "email": "johnupdated@example.com"}'
```
Example:
```sh
curl -X PUT http://localhost:5000/api/users/67b01378840b6f9aa92115c3 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "age": 32, "email": "johnupdated@example.com"}'
```

### 5. Delete a user
```sh
curl -X DELETE http://localhost:5000/api/users/{id}
```
Example:
```sh
curl -X DELETE http://localhost:5000/api/users/67b01378840b6f9aa92115c3
```

## Folder Structure
```
express-ts-crud/
│── src/
│   ├── controllers/
│   │   ├── userController.ts
│   ├── models/
│   │   ├── User.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   ├── server.ts
```

## License
This project is licensed under the MIT License.

