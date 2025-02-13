import express from "express";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../data-source"
import { plainToClass, plainToInstance } from 'class-transformer';
import { Pagination } from "../utils/Pagination";


const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const pagination = new Pagination(userRepository);

// Create a user
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = userRepository.create({ name, email, password});
    await userRepository.save(user);

    res.status(201).json(plainToInstance(User, user));
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

// List users with filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await pagination.paginate({
      page: Number(page),
      limit: Number(limit),
      filters: { select: ["id", "name", "email"] },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

// Get user details
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(plainToInstance(User, user));
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

// Update user details
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: "User not found" });
    userRepository.merge(user, req.body);
    await userRepository.save(user);
    res.json(plainToInstance(User, user));
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

// Delete a user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOne({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: "user not found" });
    await userRepository.remove(user);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});


export default router;