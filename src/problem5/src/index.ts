import express from 'express';
import dotenv from 'dotenv';
import resourceRoutes from './routes/ResourceRoutes';
import { sequelize } from './configs/database';

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/resources', resourceRoutes);

// Connect to database and start server
sequelize.sync().then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

