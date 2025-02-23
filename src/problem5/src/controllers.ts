import { Request, Response } from "express";
import { connectDB } from "./database";

export const createResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const db = await connectDB();
  const result = await db.run(
    `INSERT INTO resources (name, description) VALUES (?, ?)`,
    [name, description]
  );

  res.status(201).json({ id: result.lastID, name, description });
};

export const listResources = async (req: Request, res: Response) => {
  const { name, description } = req.query;
  const db = await connectDB();

  let query = `SELECT * FROM resources WHERE 1=1`;
  const params: string[] = [];

  if (name) {
    query += ` AND name LIKE ?`;
    params.push(`%${name}%`);
  }

  if (description) {
    query += ` AND description LIKE ?`;
    params.push(`%${description}%`);
  }

  const resources = await db.all(query, params);
  res.json(resources);
};

export const getResource = async (req: Request, res: Response) => {
  const db = await connectDB();
  const resource = await db.get(`SELECT * FROM resources WHERE id = ?`, [
    req.params.id,
  ]);

  resource
    ? res.json(resource)
    : res.status(404).json({ error: "Resource not found" });
};

export const updateResource = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const db = await connectDB();
  const result = await db.run(
    `UPDATE resources SET name = ?, description = ? WHERE id = ?`,
    [name, description, req.params.id]
  );

  result.changes
    ? res.json({ id: req.params.id, name, description })
    : res.status(404).json({ error: "Resource not found" });
};

export const deleteResource = async (req: Request, res: Response) => {
  const db = await connectDB();
  const result = await db.run(`DELETE FROM resources WHERE id = ?`, [
    req.params.id,
  ]);

  result.changes
    ? res.json({ message: "Resource deleted" })
    : res.status(404).json({ error: "Resource not found" });
};
