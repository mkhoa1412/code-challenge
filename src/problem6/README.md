### Endpoints

| Endpoint                   | Description            |
| -------------------------- | ---------------------- |
| /players/:player-id/scores | Submit player score    |
| /players/:player-id        | Get player information |
| /scoreboard/top/:count     | Get top players        |

1. Submit Player Score

   - Endpoint: `/players/:player-id/scores`
   - Description: Submit player score.
   - Authorization: Bearer <JWT>
   - Request Body:

   ```
    {
        "player_id": "<int>",
        "score": "<int>"
    }
   ```

   - Response: 202, 404

2. Get Player Information

   - Endpoint: `/players/:player-id`
   - Description: Get player information.
   - Authorization: Bearer <JWT>
   - Request Body: N/A
   - Response:

   ```
    {
        "player_id": "<int>",
        "player_name": "<string>",
        "score": "<int>",
        "rank": "<int>"
    }
   ```

3. Get Top Players
   - Endpoint: `/score-board/top/:count`
   - Description: Get top players.
   - Request Body: N/A
   - Authorization: Bearer <JWT>
   - Response:
   ```
    {
        "total": "<int>",
        "data": [
            {
                "player_id": "<string>",
                "player_name": "<string>",
                "score": "<int>",
            },
            {...}
        ]
    }
   ```

### Database

### Players Table Schema

| Column Name | Data Type | Description                  |
| ----------- | --------- | ---------------------------- |
| player_id   | INT       | Unique identifier for player |
| name        | VARCHAR   | Name of the player           |
| created_at  | TIMESTAMP | Timestamp of player creation |

### Scoreboards Table Schema

| Column Name   | Data Type | Description                       |
| ------------- | --------- | --------------------------------- |
| scoreboard_id | INT       | Unique identifier for scoreboard  |
| score         | INT       | Score of the player               |
| player_id     | INT       | Foreign key referencing player_id |
| created_at    | TIMESTAMP | Timestamp of scoreboard creation  |

### Update Player Score

To update the score of a player, you can execute the following SQL query:

```sql
UPDATE players
SET score = <new_score>
WHERE player_id = <player_id>;
```

### Write a SQL query to calculate the scores and rank the top 10 players

```
SELECT player_id, SUM(score) AS total
FROM scoreboards
GROUP BY player_id
ORDER BY total DESC
LIMIT 10;
```

#### Functional Requirement:

1. Shows the top 10 user’s scores
2. Live update of the score board (real time)
3. Prevent malicious users from increasing scores without authorization

#### Non functional requirement:

1. Scalability
   The system implements a caching layer to manage read-heavy loads, particularly for scoreboard viewing by clients.
   To handle write-heavy loads, the system can scale by partitioning the data store or utilizing an in-memory architecture.
   A Redis node can efficiently manage up to 40 thousand queries per second during peak loads.
   Denormalizing the data can optimize read operations for faster access. Furthermore, segregating the read and write paths can enhance the performance of the scoreboard.

- Performance

#### Solution

1. Shows the top 10 user’s scores

```
zrevrange scoreboard 0 9 withscores
```

zrevrange (as well as zrange) takes O(log(N)+M) to execute,
where N is the total number of entries in the Set and M is the number of elements to be returned.

2. Live update of the score board (real time)

   Extract all the information required to build the Scoreboard from your Points table in MySQL.
   What we will extract here is the total sum of points for each of the Players in the database.
   The result set will the IDs of the player together with the total Points they have earned.

   Create a Sorted Set in Redis and feed it with the result set obtained in the previous step.
   As explained before, the ID of the Player becomes the Key of the Sorted Set entry,
   and the total number of points becomes the Scoreboard. To add an entry to a sorted set you need to use the ZADD command.
   ZADD takes three parameters: the name of the sorted set, the score and the key, and takes O(log(n)) time to execute.

3. Prevent malicious players from increasing scores without authorization

- Using JWT token for authorization
- Rate limit the requests
- Encrypt the communication to prevent packet sniffing

### High level design

Small-scale scoreboard (small-scale.png)

1. Score update workflow
2. Display workflow
