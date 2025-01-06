import "reflect-metadata";

import * as dotenv from "dotenv";
import * as express from "express";

import { AppDataSource } from "./config/data-source";
import { authRoutes } from "./modules/auth/auth.routes";
import { scoreboardRoutes } from "./modules/scoreboard/scoreboard.routes";
import { userRoutes } from "./modules/user/user.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/scoreboard", scoreboardRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT);
  })
  .catch((error) => console.log(error));
