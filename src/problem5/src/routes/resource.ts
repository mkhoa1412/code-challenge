import express from 'express';
import { db } from '../db';

export const resourceRouter = express.Router();

resourceRouter.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const stmt = db.prepare(
    'INSERT INTO resources (name, description) VALUES (?, ?)'
  );
  const result = stmt.run(name, description);
  const id = result.lastInsertRowid;

  res.status(201).json({ id });
});

resourceRouter.get('/', (req, res) => {
  const { name } = req.query;
  const query = name
    ? db.prepare('SELECT * FROM resources WHERE name LIKE ?')
    : db.prepare('SELECT * FROM resources');
  const resources = name ? query.all(`%${name}%`) : query.all();
  res.json(resources);
});

resourceRouter.get('/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM resources WHERE id = ?');
  const resource = stmt.get(req.params.id);
  if (!resource) return res.status(404).json({ error: 'Not found' });
  res.json(resource);
});

resourceRouter.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const stmt = db.prepare(
    'UPDATE resources SET name = ?, description = ? WHERE id = ?'
  );
  const result = stmt.run(name, description, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ updated: true });
});

resourceRouter.delete('/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM resources WHERE id = ?');
  const result = stmt.run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
});
