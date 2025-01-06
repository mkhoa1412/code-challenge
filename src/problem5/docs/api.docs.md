# API Documentation for User and Scoreboard System

## **Introduction**

This service simulates a scoreboard system with the following actions:

### **Authentication**

- **Sign up** (`POST /auth`)
- **Login** (`GET /auth`)

### **User Management**

- Retrieve information of multiple users by a list of IDs.
- Retrieve information of a specific user.
- Update a user.
- Delete a user.

### **Scoreboard Management**

- Retrieve the scoreboard list.
- Join the scoreboard.
- Update score (1 point per update).
- Leave the scoreboard.

Please note: You must log in to receive a JWT token. This token is required to use any `POST`, `PATCH`, `PUT`, or `DELETE` APIs (except for the `auth` resources).

For more details, see the API list below.

## **0. Auth**

### **0.1 Sign up (Create User)**

- **Method:** `POST`
- **Endpoint:** `/auth`
- **Request Body:**

  ```json
  {
    "username": "Username",
    "password": "Password",
  }
  ```

- **Response:**

  ```json
  {
    "id": "User's UUID",
    "username": "Username",
    "createdAt": "Creation timestamp"
  }
  ```

### **0.2 Login**

- **Method:** `GET`
- **Endpoint:** `/auth?username=username&password=password`
- **Response:**

  ```json
  {
    "token": "JWT token"
  }
  ```

## **1. User APIs (/users)**

### **1.1 Get Multiple Users**

- **Method:** `GET`
- **Endpoint:** `/users`
- **Query Parameters:**
  - `ids`: Array containing a list of `userId` to fetch information for.
  - Example: `/users?ids=["id1","id2","id3"]`
- **Response:**

  ```json
  [
    {
      "id": "User's UUID",
      "username": "Username",
    },
    ...
  ]
  ```

### **1.2 Get User by ID**

- **Method:** `GET`
- **Endpoint:** `/users/:userId`
- **Response:**

  ```json
  {
    "id": "User's UUID",
    "username": "Username",
  }
  ```

### **1.3 Update User**

- **Method:** `PUT`
- **Endpoint:** `/users/:userId`
- **Authorization:** `Bearer <token>`
- **Request Body:**

  ```json
  {
    "username": "New username (optional)",
    "password": "New password (optional)",
  }
  ```

- **Response:**

  ```json
  {
    "id": "User's UUID",
    "username": "Updated username",
    "updatedAt": "Update timestamp"
  }
  ```

### **1.4 Delete User**

- **Method:** `DELETE`
- **Endpoint:** `/users/:userId`
- **Authorization:** `Bearer <token>`
- **Response:**

  ```json
  {
    "message": "User has been deleted"
  }
  ```

---

## **2. Scoreboard APIs (/scoreboards)**

### **2.1 Join Scoreboard**

- **Method:** `POST`
- **Endpoint:** `/scoreboards`
- **Authorization:** `Bearer <token>`
- **Response:**

  ```json
  {
    "id": "Scoreboard's UUID",
    "userId": "User's UUID",
    "score": 0,
    "createdAt": "Creation timestamp"
  }
  ```

### **2.2 Get All Scoreboards**

- **Method:** `GET`
- **Endpoint:** `/scoreboards`
- **Query Parameters (Optional):**
  - `sort`: `asc` or `desc` (Default: `desc`).
- **Response:**

  ```json
  [
    {
      "id": "Scoreboard's UUID",
      "user": {
        "id": "User's UUID",
        "username": "Username"
      },
      "score": "User's score"
    },
    ...
  ]
  ```

### **2.3 Get Scoreboard by ID**

- **Method:** `GET`
- **Endpoint:** `/scoreboards/:id`
- **Response:**

  ```json
  {
    "id": "Scoreboard's UUID",
    "user": {
      "id": "User's UUID",
      "username": "Username"
    },
    "score": "User's score"
  }
  ```

### **2.4 Update Score (Increase by 1)**

- **Method:** `PATCH`
- **Endpoint:** `/scoreboards`
- **Authorization:** `Bearer <token>`
- **Response:**

  ```json
  {
    "id": "Scoreboard's UUID",
    "user": {
      "id": "User's UUID",
      "username": "Username"
    },
    "score": "score + 1"
  }
  ```

### **2.5 Delete from Scoreboard**

- **Method:** `DELETE`
- **Endpoint:** `/scoreboards`
- **Authorization:** `Bearer <token>`
- **Response:**

  ```json
  {
    "message": "Scoreboard entry has been deleted"
  }
  ```
