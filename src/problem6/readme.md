# Scoreboard Module Documentation

## Overview

This document specifies the Scoreboard Module for our API service (backend application server). The purpose of this module is to:

- Provide an endpoint to retrieve the top 10 users and their scores.
- Allow authorized clients to update a user’s score when the user performs a relevant action on the front end.
- Prevent malicious score tampering by ensuring that only valid, authorized requests can update the score.
- Support real-time or near real-time scoreboard updates to the front end.

## Table of Contents

- [Architecture and Flow](#architecture-and-flow)
- [API Endpoints](#api-endpoints)
  - [GET /api/scoreboard](#1-get-apiscoreboard)
  - [POST /api/scoreboard](#2-post-apiscoreboard)
- [Data Model](#data-model)
- [Authentication & Security](#authentication--security)
- [Implementation Details](#implementation-details)
- [Error Handling](#error-handling)
- [Future Enhancements](#future-enhancements)

## Architecture and Flow

1. **Client Action**
   The user (already authenticated) performs an action on the website or app that should increment (or otherwise update) their score.
2. **Score Update Request**
   The front end sends a `POST` request to the backend API (e.g., `POST /api/scoreboard`) with the updated score or an indicator of the action performed.
3. **Authorization Check**
   The API service verifies the authenticity of the request (e.g., via JWT, session token, or OAuth). If valid, proceed; if not, reject.
4. **Database Update**
   The backend updates the user’s score in the database.
5. **Retrieve Updated Top Scores**
   The backend retrieves the top 10 scores from the database.
6. **Response to Client**
   The backend returns the updated top 10 scoreboard to the front end (in the response body).
7. **Front-End Refresh**
   The front end receives the updated scoreboard data and refreshes the scoreboard view.
8. **Real-Time Broadcasting (Optional)**
   If real-time updates are desired for all connected clients (not just the user who triggered the update), the backend can push or broadcast the new scoreboard to subscribed clients via WebSocket, Server-Sent Events (SSE), or a similar mechanism.

## API Endpoints

### 1. GET /api/scoreboard

**Description:**
Retrieves the current top 10 user scores.

**Request Example:**

```http
GET /api/scoreboard
```

**Response Example (JSON):**

```json
{
  "data": [
    {
      "userId": "123",
      "username": "PlayerOne",
      "score": 1500
    },
    {
      "userId": "456",
      "username": "PlayerTwo",
      "score": 1480
    }
    // ... up to 10 users
  ]
}
```

**Notes:**

- Ensure the data is sorted by score in descending order.
- Pagination is optional but typically not required for just the top 10.

### 2. POST /api/scoreboard

**Description:**
Updates a user’s score after the user performs an action on the front end.

**Request Body Example (JSON):**

```json
{
  "userId": "123",
  "increment": 50
}
```

Alternatively, if you want to handle the logic on the server, you can send a game action (e.g., `"action": "win_match"`) instead of a direct numeric increment.

**Response Example (JSON):**

```json
{
  "message": "Score updated successfully",
  "updatedScoreboard": [
    {
      "userId": "123",
      "username": "PlayerOne",
      "score": 1550
    }
    // ... up to 10 users
  ]
}
```

**Notes:**

- The server should confirm the user is authorized to modify their own score.
- The server can store the increment logic (e.g., awarding 50 points for a certain action) or accept a direct numeric increment—depending on your design.

## Data Model

A simple representation in a relational database (e.g., PostgreSQL):

```sql
CREATE TABLE scores (
  user_id      CHAR(36) PRIMARY KEY,
  username     VARCHAR(255) NOT NULL,
  score        INT DEFAULT 0,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Or in a NoSQL database (e.g., MongoDB), you might have a collection `scores` with documents like:

```json
{
  "userId": "123",
  "username": "PlayerOne",
  "score": 1500,
  "updatedAt": "2025-01-01T10:00:00Z"
}
```

## Authentication & Security

- **JWT (JSON Web Token)**

  - Typically included in the `Authorization` header: `Bearer <token>`.
  - The server verifies the token to ensure the request is coming from an authenticated user.
  - The token payload includes the user’s ID, so the server can ensure they are only updating their own score.
- **HTTPS**

  - Enforce secure connections (`https://`) to protect tokens and user data in transit.
- **Role/Permission Checks**

  - Ensure only the owner of the user account (or an admin) can update that user’s score.
- **Request Validation**

  - Validate that the request body contains valid data (e.g., no negative increments if that’s not allowed).

## Implementation Details

- **Server Framework**
  You can use any modern framework (e.g., Express.js for Node.js, Flask/FastAPI for Python, Spring Boot for Java).
- **Controller/Route Logic**

  - `GET /api/scoreboard`: Fetch top 10 from DB, return sorted list.
  - `POST /api/scoreboard`: Validate token, parse request body, update DB, fetch top 10, return.
- **Database Layer**
  Provide a method like `updateScore(userId, increment)` to handle the logic of adding points.
  Provide a method like `getTopScores(limit = 10)` to retrieve the top 10.
- **Real-Time Updates**
  Optional step: use WebSockets, SSE, or a pub/sub system.
  On each score update, the server can broadcast the new scoreboard to all connected clients.

## Error Handling

- **401 Unauthorized:** If the JWT is missing or invalid.
- **403 Forbidden:** If the user tries to update a score that doesn’t belong to them (and they’re not an admin).
- **400 Bad Request:** If the request body is malformed or data is invalid.
- **500 Internal Server Error:** For unhandled exceptions (e.g., database connection issues).

## Future Enhancements

- **Pagination:** If the scoreboard grows or you want to show more than the top 10, add pagination to the `GET /api/scoreboard`.
- **Leaderboards by Category:** If you have multiple game modes or categories.
- **Caching:** Use a caching layer (like Redis) to quickly serve the top 10 scoreboard and reduce DB queries.
- **Rate Limiting:** Protect the API from spam or DDoS attacks by limiting requests per user/IP.
