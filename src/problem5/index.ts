// server.ts
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./router/user.router";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://lehau:1234@twitter.h94v81b.mongodb.net/?retryWrites=true&w=majority&appName=twitter"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
