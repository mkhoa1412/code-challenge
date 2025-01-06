import { Request, Response } from "express";

import * as authService from "./auth.service";

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const user = await authService.createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.query;

    if (!username || !password) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const token = await authService.login(
      username.toString(),
      password.toString()
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
