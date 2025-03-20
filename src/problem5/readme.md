init project: npm init -y
setup package and library: npm i express dotenv pg cors, npm i --save-dev typescript ts-node @types/node @types/express @types/pg @types/cors 
CRUD Resource App

## Setup Instructions

### 1. Create the Database and Table
Before running the application, ensure that the PostgreSQL database and the `Resource` table are created.

#### **Create Database**
```sh
psql -U your_username
CREATE DATABASE your_database;
```

#### **Connect to the Database**
```sh
psql -U your_username -d your_database
```

#### **Create the `Resource` Table**
```sql
CREATE TABLE Resource (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Install Dependencies
Once the database is set up, install the necessary dependencies:
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your database and application configuration:
```
PORT=5000
TYPE = postgres
HOST=localhost
DB_PORT=5432
USER=your_username
PASSWORD=your_password
DB=your_database
```

### 4. Run the Application
After setting up the database and environment variables, start the application:
```sh
ts-node start
```

### 5. Verify Database Connection
Check if the database is properly connected and the table is accessible:
```sh
psql -U your_username -d your_database -c "SELECT * FROM todo;"
```