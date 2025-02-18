# CRUD API Document

## Project Overview

**This is a simple CRUD API built using Express.js, TypeScript, and MySQL. It supports:**
**Create, Read, Update, Delete (CRUD) operations**
**Filtering with Query Parameters**
**Environment Variables Configuration**

---

## Folder Structure

```
src/
│── problem5/
│   ├── .env                    # Environment configuration (DO NOT COMMIT)
│   ├── database_schema.sql     # SQL schema file
│   ├── server.ts               # Main server file
│   ├── readme.md               # Project documentation
│── package.json                # Dependencies and scripts
│── tsconfig.json               # TypeScript configuration
│── readme.md                   # Solutions documentation
```

---

## Configuration

### **Setup Environment Variables**

Create a `.env` file in the **root folder** and add the following variables:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=crud_database
PORT=3000
```

> **WARNING:** Do not expose `.env` in public repositories!

---

## Installation & Running the Server

### **Install Dependencies**

```sh
npm install
```

### **Start the MySQL Database**

Make sure your MySQL server is running and has the required database.

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

### **Run the Application (Development Mode)**

```sh
npx ts-node src/problem5/server.ts
```

### **Run the Application (Compiled Production Mode)**

```sh
npx tsc  # Compile TypeScript to JavaScript
```

---

## API Endpoints

### **CRUD Operations**

#### 1. Get All Resources

```http
GET /resources
```

#### 2. Get Resources with Filters

```http
GET /resources?name=example
```

#### 3. Get Resource by ID

```http
GET /resources/:id
```

#### 4. Create a New Resource

```http
POST /resources
```

**Body (JSON):**

```json
{
    "name": "New Resource",
    "description": "Resource description"
}
```

#### 5. Update a Resource

```http
PUT /resources/:id
```

**Body (JSON):**

```json
{
    "name": "Updated Resource",
    "description": "Updated description"
}
```

#### 6. Delete a Resource

```http
DELETE /resources/:id
```

---

### Additional Features (Future update):

**Authentication & JWT Protection** (Planned for future implementation)
**Rate Limiting** (To prevent spam & abuse)
**Caching with Redis** (Speed up `GET` requests)
**Unit Testing**
