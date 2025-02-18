# 99Tech Code Challenge #1 #

Note that if you fork this repository, your responses may be publicly linked to this repo.  
Please submit your application along with the solutions attached or linked.   

It is important that you minimally attempt the problems, even if you do not arrive at a working solution.

## Submission ##
You can either provide a link to an online repository, attach the solution in your application, or whichever method you prefer.
We're cool as long as we can view your solution without any pain.

---


### Project Overview
This repository contains solutions for three problems from the 99Tech coding challenge. Each problem is solved using **TypeScript, Node.js, and MySQL** (where applicable). The problems include:

- **Problem 4:** Sum to N (Mathematical & Iterative Solutions)
- **Problem 5:** CRUD API Server (Express.js + MySQL)
- **Problem 6:** Score Tracking API (Architecture & Documentation)

---
### Setup Instructions
### 1. **Install Dependencies**
```sh
npm install
```

### 2. **Set Up Environment Variables**
Create a `.env` file in the root directory and configure it as follows:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=crud_database
DB_PORT=3000
```

### 3. **Database Setup**
### **Create the Database**
If your MySQL database is not created yet, run:
```sh
mysql -u root -p -e "CREATE DATABASE crud_database;"
```

### **Create Tables & Insert Mock Data**
The SQL schema file **`database_schema.sql`** is already included in this repository.
To import it into MySQL, simply run:
```sh
mysql -u root -p crud_database < database_schema.sql
```

To verify the data, log into MySQL and check:
```sh
mysql -u root -p
```

Inside MySQL:
```sql
USE crud_database;
SHOW TABLES;
SELECT * FROM resources;
```
---

## **Problem 4: Sum to N**

#### 1. **Features**:
- Implemented 3 different ways to sum numbers from 1 to N:
  - **Iterative Approach**
  - **Mathematical Formula Approach**
  - **Recursive Approach**
- Includes input validation to ensure only positive integers are accepted.

#### 2. **Run the Code**:
```sh
npx ts-node src/problem4/sum-to-n.ts
```

---

## **Problem 5: CRUD API Server**

#### 1. **Features**:
- **CRUD API** for managing resources (`Create, Read, Update, Delete`).
- **MySQL Database Integration** using **Knex.js**.
- **Basic Filtering for GET Requests**.

#### 2. **Run the Server**:
```sh
npx ts-node src/Problem5_a-crude-server/server.ts
```

#### 3. **Test API Endpoints with Postman**:

| Method   | Endpoint         | Description                    |
| -------- | ---------------- | ------------------------------ |
| `POST`   | `/resources`     | Create a new resource          |
| `GET`    | `/resources`     | List resources (with filters)  |
| `GET`    | `/resources/:id` | Get a specific resource        |
| `PUT`    | `/resources/:id` | Update resource details        |
| `DELETE` | `/resources/:id` | Delete a resource              |

Use **Postman** or **cURL** to test the API.

---

## **Problem 6: Score Tracking API (Architecture & Documentation)**

#### 1. **Features**:
- API architecture designed for **real-time scoreboard tracking**.
- **WebSocket integration** for live score updates.
- **API documentation provided via OpenAPI (`openapi.yaml`)**.

#### 2. **How the System Works**
1. **Users perform an action** → It triggers a score update.
2. **Frontend sends an API request** (`POST /scores/update`).
3. **Backend validates the request** (JWT authentication, rate limiting).
4. **Score is updated in the database**.
5. **WebSocket broadcasts the new score** to connected users.
6. **Frontend updates the live scoreboard**.

#### 3. Future Enhancements
- **Rate limiting** to prevent abuse.
- **Role-based access control (RBAC)** for admin/user separation.
- **Unit tests for API endpoints**
- **Docker support** for easy deployment.
