import { Request, Response } from "express";

import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import * as scoreboardService from "./scoreboard.service";

export async function joinScoreboard(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = req.user;
    console.log("🚀 ~ user:", user);

    const entry = await scoreboardService.joinScoreboard(user.id);
    res.status(201).json({ message: "User joined the scoreboard.", entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getScoreboard(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const sort = (req.query.sort as "asc" | "desc") || "desc";
    const limit = req.query.limit || "10";
    const offset = req.query.offset || "0";
    const userIds = req.query.userIds as string[];

    const entries = await scoreboardService.getScoreboard(
      sort,
      parseInt(limit as string),
      parseInt(offset as string),
      userIds
    );
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateScore(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = req.user;

    const updatedEntry = await scoreboardService.updateScore(user.id);
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function leaveScoreboard(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = req.user;
    await scoreboardService.leaveScoreboard(user.id);
    res.json({ message: "User left the scoreboard." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
