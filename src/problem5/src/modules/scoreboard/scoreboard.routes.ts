import * as express from "express";

import { authenticate } from "../../middleware/auth.middleware";
import * as scoreboardController from "./scoreboard.controller";

export const scoreboardRoutes = express.Router();

scoreboardRoutes.get("/", scoreboardController.getScoreboard);
scoreboardRoutes.post("/", authenticate, scoreboardController.joinScoreboard);
scoreboardRoutes.patch("/", authenticate, scoreboardController.updateScore);
scoreboardRoutes.delete(
  "/",
  authenticate,
  scoreboardController.leaveScoreboard
);
