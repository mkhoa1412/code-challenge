
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import router from './src/routes/todo-list';
import { initSQLite } from './src/dbs';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging middleware

// Serve Swagger UI
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
const specs = swaggerJsdoc(options);
fs.writeFileSync('./swagger.json', JSON.stringify(specs, null, 2));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api', router); // Mount the todoList router under /api prefix

// Initialize SQLite and then start the server
initSQLite().then(() => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3000; // Use the port specified in environment variable or default to 3000

  app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}).catch((error) => {
  console.error('Error initializing SQLite:', error);
});