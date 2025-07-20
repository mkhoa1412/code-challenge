import Database from 'better-sqlite3';
import path from 'path';

export const db = new Database(path.resolve(__dirname, 'data.db'));

// Initialize table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
