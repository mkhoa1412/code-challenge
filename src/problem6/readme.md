# Task Management API Service

## Overview

This module provides an API service for managing a task tracking system that allows users to create, update, and complete tasks efficiently. It ensures real-time updates, prevents unauthorized modifications, and maintains a structured task list.

## Features

- Stores user tasks.
- Provides a list of active tasks.
- Updates task statuses when users complete them.
- Implements security measures to prevent unauthorized modifications.

## API Endpoints

### 1. Create Task

**Endpoint:** `POST /api/task/create`

**Description:** Creates a new task.

**Request:**
```json
{
    "taskName": "string",
    "token": "string",
    "userId": "string"
}
```

**Response:**
```json
{
    "message": "success"
}
```

### 2. Fetch Active Tasks

**Endpoint:** `GET /api/task/active`

**Description:** Retrieves a list of all active tasks.

**Response:**
```json
[
  {
    "taskId": "string",
    "taskName": "string",
    "status": "active"
  },
  ...
]
```

### 3. Complete Task

**Endpoint:** `POST /api/task/complete`

**Description:** Marks a task as completed.

**Request:**
```json
{
    "taskId": "string",
    "userId": "string",
    "token": "string"
}
```

**Response:**
```json
{
    "message": "Task completed successfully"
}
```

### 4. Delete Task

**Endpoint:** `DELETE /api/task/delete`

**Description:** Deletes a task permanently.

**Request:**
```json
{
    "taskId": "string",
    "userId": "string",
    "token": "string"
}
```

**Response:**
```json
{
    "message": "Task deleted successfully"
}
```

## Security Measures

- **Authentication:** Requires valid user tokens for task modifications.
- **Authorization:** Ensures users can only modify their own tasks.
- **Rate Limiting:** Prevents abuse by limiting API requests per user.
- **Input Validation:** Ensures valid data format in API requests.

## Error Handling

The API provides structured error responses for various failure scenarios:

### General Error Response Format
```json
{
    "error": "string",
    "statusCode": "number"
}
```

### Common Errors

| Error Code | Scenario | Response |
|------------|---------------------------------|------------------------------------------------|
| 400 | Invalid request data | `{ "error": "Invalid input", "statusCode": 400 }` |
| 401 | Unauthorized access | `{ "error": "Unauthorized", "statusCode": 401 }` |
| 403 | Forbidden action | `{ "error": "Forbidden", "statusCode": 403 }` |
| 404 | Resource not found | `{ "error": "Not Found", "statusCode": 404 }` |
| 429 | Too many requests | `{ "error": "Rate limit exceeded", "statusCode": 429 }` |
| 500 | Server error | `{ "error": "Internal server error", "statusCode": 500 }` |

## Real-time Task Update Strategy

To ensure efficient task management, the system can implement the following update mechanisms:

1. **WebSockets:** Enables instant task updates for users.
2. **Polling:** Frontend fetches active tasks periodically.
3. **Database Triggers:** Automates task status updates based on predefined conditions.

## Execution Flow

1. User creates a new task via `POST /api/task/create`.
2. Task is stored in the database.
3. User fetches active tasks using `GET /api/task/active`.
4. User completes a task via `POST /api/task/complete`.
5. Task status updates in real-time using WebSockets or polling.
6. User deletes a task via `DELETE /api/task/delete` (if needed).

## Future Improvements

- Implement task prioritization.
- Allow task assignment to multiple users.
- Add notification system for task deadlines.
- Integrate AI-based task suggestions.

