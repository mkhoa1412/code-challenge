import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initDB } from "./database";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Initialize database and start server
initDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
