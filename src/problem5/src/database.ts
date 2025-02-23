import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const connectDB = async () => {
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
};

export const initDB = async () => {
  const db = await connectDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
  `);
};
