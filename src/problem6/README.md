# Scoreboard API Module

## Overview
- The Scoreboard API module allows users to increase their scores based on completed actions and provides a live update for the scoreboard. This document outlines the API endpoints, data models, authentication mechanisms, and system flow.

## Objectives
- Real-time scoreboard: Display the top 10 users with the highest scores.
- Secure score update: Prevent unauthorized score manipulation.
- Efficient data handling: Ensure low latency for high-frequency score updates.

## API Endpoints

1.  **Update User Score**
- Endpoint:
  - PUT /api/v1/score
- Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```
- Request Body:
```
{
  "userId": "abc123",
  "score": 10
}
```
- Response
```
{
  "message": "Score updated successfully",
  "currentScore": 120
}
```
- Error Response
  - 400 Bad Request: Missing required fields.
  - 401 Unauthorized: Invalid token.
  - 500 Internal Server Error: Server-side issue.

- Notes:
  - The score field represents the points gained from the completed action.

2.  **Get Top 10 Scores**
- Endpoint:
  - GET /api/v1/score/top
- Response
```
[
  { "userId": "abc123", "username": "Binh1", "score": 250 },
  { "userId": "xyz456", "username": "Binh2", "score": 240 }
]
```

## Authentication & Security

- JWT-Based Authentication: Users must provide a valid token in the Authorization header.
- Rate Limiting: Limit requests to prevent spam (e.g., 10 requests per minute).
- Input Validation: Ensure userId and score are valid and sanitized.

## Implementation Notes

- Database: Use PostgreSQL with Sequelize ORM.
- Real-time Updates: Implement WebSocket (e.g., socket.io) to broadcast updates.
- Caching: Use Redis to cache top 10 scores for faster access.

## Improvements & Considerations

- Score Decay: Implement periodic score decay to maintain competition.
- Audit Trail: Log score changes for future analysis.
- Leaderboard Filtering: Allow filtering by time range (daily, weekly, all-time).

## System Flow Diagram

**Execution Flow**

1. User Action: The user performs an action on the website.
2. API Request: The website sends a PUT /api/score request with a JWT token.
3. Authentication: The application server verifies the JWT token.
4. Database Update: The server updates the user’s score in the PostgreSQL database.
5. Cache Update: Redis updates the top 10 scores.
6. Broadcast: The server emits a WebSocket event with the updated scoreboard.
7. Frontend Update: The website receives the WebSocket event and updates the leaderboard in real-time.

## Technology Stack

- **Backend Framework**: Express.js
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.IO
- **Authentication**: JWT-based authentication
- **Dev Enviroment**: Docker
