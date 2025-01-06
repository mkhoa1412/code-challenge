import { Request, Response } from "express";

import * as userService from "./user.service";

/**
 * Get multiple users by IDs
 */
export async function getUserByIds(req: Request, res: Response): Promise<void> {
  try {
    const ids = req.query.ids;

    // if (!ids) {
    //   res.status(400).json({ message: "Query parameter 'ids' is required." });
    //   return;
    // }

    const idArray = ids ? JSON.parse(ids as string) : undefined; // Parse query string to array
    const users = await userService.getUsersByIds(idArray);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const user = await userService.updateUser(userId, updates);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;

    const message = await userService.deleteUser(userId);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
