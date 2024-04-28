## API Service Backend Module: Scoreboard API Service

### Overview
This module is responsible for handling requests related to updating and retrieving user scores for the scoreboard feature on the website. It ensures real-time updates of the top 10 user scores and implements security measures to prevent unauthorized score increases.

### Software Requirements
1. **Score Board Display**: The module should display the top 10 user scores on the website.
2. **Real-time Updates**: The score board should be updated in real-time.
3. **User Action**: The user can perform an action (the nature of which is not specified) to increase their score.
4. **API Call**: Upon completion of the user action, an API call is dispatched to the application server to update the score.
5. **Score Increase**: Only one score increase per user action is allowed. Subsequent actions will be ignored.
6. **Security**: Measures should be in place to prevent malicious users from unauthorized score increases.

## API Endpoints

The following endpoints are available for interacting with the Scoreboard API Service:

- `GET /scores`: Retrieves the top 10 user scores.
- `POST /scores/update`: Updates a user's score upon completion of an action. Only users with valid authentication tokens are allowed to update their scores.

### Flow of Execution
1. The client application triggers an action (e.g., completing a task) that increases the user's score.
2. Upon completion of the action, the client application sends a POST request to the `/scores/update` endpoint of the API service, including the user's authentication token and the updated score.
3. The API service receives the request and verifies the user's authentication token to ensure authorization.
4. If the authentication token is valid, the API service queues an asynchronous task (e.g., using Bull Queue) to process the score update asynchronously.
5. The asynchronous task calculates the score increase corresponding to the user action and temporarily stores it in a caching layer (e.g., Redis).
6. When the user calls the API to update the score (via `POST /scores/update`), the API service retrieves the temporarily stored score increase from the caching layer and updates the user's score in the database.
7. After updating the score, the API service retrieves the top 10 scores from the database and returns the updated scoreboard data to the client application as a response.

### Diagram
![Flow Diagram](./problem-6.png)

### Comments for Improvement
- Using an asynchronous task queue (e.g., Bull Queue) for processing score updates asynchronously can significantly improve performance, especially for large actions.
- Implementing caching (e.g., Redis) for temporarily storing score updates can further optimize performance and reduce database load.
- Ensure proper error handling and logging mechanisms are in place to handle exceptions and monitor the score update process effectively.

