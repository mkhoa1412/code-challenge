## Functionalities

1. **Update User Score**
   Endpoint to update the user’s score when they complete a valid action

2. **Retrieve Top 10 Scores**
   Endpoint to fetch the top 10 users sorted by score

3. **Real-Time Broadcasting**
   Push updates to all connected clients when the scoreboard changes

4. **Authentication & Protection**
   Validate user identity to prevent score manipulation

---

## API Endpoints

### 1. `POST /api/score/update`

**Description:** Increases the user's score upon action completion.

**Auth:** Required JWT

**Body:**

```json
{
  // userId could be gotten from JWT
  "actionId": "action1"
}
```

Backend takes the `actionId`, then updates the score accordingly

```js
const scoreMap = {
  action1: 10,
  action2: 25,
};
```

**Response**

```json
{
  "success": true,
  "newScore": 150
}
```

### 2. `GET /api/scoreboard/top`

**Description**: Returns the top 10 users with the highest scores.

**Response**:

```json
[
  { "userId": "u1", "username": "A", "score": 210 },
  { "userId": "u2", "username": "B", "score": 200 },
  ...
]
```

### 3. Real-Time Update Flow

Use WebSocket or Server-Sent Events (SSE) to push scoreboard updates to all clients when any user's score affects the top 10 list.

Channel: `/ws/scoreboard`

Broadcast Event:

```json
{
  "type": "SCOREBOARD_UPDATED",
  "payload": [...top10Scores]
}
```

## Prevent bad actors from increasing scores without authorization

1. Rate Limiting or Throttling: prevent users spamming requests
2. Signature: BE generates an action token `sign({ userId, action: "action1", }, SECRET_KEY)`, and FE submits the tokens
3. Preventing Replay: each action will have unique `actionId`, after updating user's score, mark that action was used.
   BE can sign the action with a secret to prevent attackers from guessing `actionId`
