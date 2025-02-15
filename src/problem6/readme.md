# Scoreboard API System Design

## Overview
The Scoreboard API is designed to manage a real-time leaderboard using Redis ZSET. The system supports secure score updates, real-time updates via WebSockets, and high-performance queries for top rankings.

## Tech Stack
- **Backend:** Node.js with Express
- **Database:** Redis (ZSET for sorted scores)
- **Real-time Communication:** WebSocket
- **Authentication:** JWT for user validation
- **Security:** Rate limiter, Circuit Breaker

## System Components
### 1. User Clients (Mobile/Web)
- Sends score updates via HTTP or WebSocket
- Receives real-time leaderboard updates via WebSocket
- Authenticated using JWT tokens

### 2. API Gateway (Express Server)
- Routes requests to appropriate services
- Handles authentication and validation
- Implements rate limiting and security checks

### 3. WebSocket Server
- Manages real-time leaderboard updates
- Pushes ranking changes to connected clients

### 4. Redis ZSET Cluster
- Stores leaderboard data efficiently
- Supports fast retrieval of top scores and user ranks

### 5. Security Layer
- JWT Authentication for API access
- Rate limiting to prevent abuse
- Circuit breaker to handle failures

### 6. Notification System
- Sends notifications when a user enters the top 10
- Uses a queue system for scalable processing

## API Endpoints
### 1. Update User Score
**Endpoint:** `POST /api/score/update`
```json
{
  "Authorization": "Bearer <token>",
  "userId": "123456",
  "score": 50
}
```
**Response:**
```json
{
  "message": "Score updated successfully"
}
```

### 2. Get Top 10 Scores
**Endpoint:** `GET /api/score/top`
**Response:**
```json
[
  { "userId": "123", "score": 500 },
  { "userId": "124", "score": 480 }
]
```

### 3. Get User Rank
**Endpoint:** `GET /api/score/rank/:userId`
**Response:**
```json
{
  "userId": "123",
  "rank": 3,
  "score": 500
}
```

## Data Storage (Redis ZSET)
- **Key:** `leaderboard`
- **Value:** `ZADD leaderboard <score> <userId>`
- Example:
```
ZADD leaderboard 500 "user1"
ZADD leaderboard 450 "user2"
```

## Security Measures
1. **JWT Authentication** - Ensures only authenticated users can update scores.
2. **Rate Limiting** - Prevents spam updates.
3. **Circuit Breaker** - Handles service failures gracefully.


![System Design Diagram](image.png)


## Next Steps
- Implement WebSocket for live score updates.
- Add time-based leaderboards (daily, weekly, monthly).
- Store historical scores in a database.

