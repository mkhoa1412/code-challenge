// Import required dependencies
import express, { Application, Request, Response, NextFunction } from 'express';
import { Knex, knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Save sensitive info to env.
dotenv.config({ path: path.resolve(__dirname, '.env') });
// Connect database
const db: Knex = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
});
interface Resource {
  id: number;
  name: string;
  description?: string;
}
const filterableColumns: (keyof Resource)[] = ['id', 'name', 'description'];

const app: Application = express();
app.use(express.json());

// Validation
const validateResourceInput = (req: Request, res: Response, next: NextFunction): void => {
  const { name, description } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: "Name is required and must be a string." });
    return;
  }
  if (description && typeof description !== 'string') {
    res.status(400).json({ error: "Description must be a string." });
    return;
  }

  next();
};
const validateIdParam = (req: Request, res: Response, next: NextFunction): void => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid ID. It must be a positive number." });
    return;
  }
  next();
};

/** CRUD Endpoints */
app.get('/resources', async (req: Request, res: Response) => {
  try {
    let query = db<Resource>('resources').select('*');
    const filters: Record<string, any> = {};
    const invalidFilters: string[] = [];

    // Validate query parameters
    for (const [key, value] of Object.entries(req.query)) {
      if (filterableColumns.includes(key as keyof Resource)) {
        filters[key] = value;
      } else {
        invalidFilters.push(key);
      }
    }
    // Return error if there are any invalid filters
    if (invalidFilters.length > 0) {
      res.status(400).json({ error: `Invalid filters: ${invalidFilters.join(', ')}` });
      return;
    }
    // If no filters are applied, return all resources
    if (Object.keys(filters).length === 0) {
      const resources = await query;
      res.json(resources);
    } else {
      // Apply filters dynamically
      Object.entries(filters).forEach(([key, value]) => {
        query = query.where(key, 'like', `%${value}%`);
      });
      const resources = await query;
      res.json(resources);
    }
  } catch (error: any) {
    console.error('Error fetching resources:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/resources/:id', validateIdParam, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const resource = await db<Resource>('resources').where({ id }).first();
    if (!resource) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }

    res.json(resource);
  } catch (error: any) {
    console.error('Error fetching resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/resources', validateResourceInput, async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const insertedIds: number[] = await db<Resource>('resources').insert({ name, description });
    const insertedId = insertedIds[0];
    res.status(201).json({ id: insertedId, name, description });
  } catch (error: any) {
    console.error('Error creating resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/resources/:id', validateIdParam, validateResourceInput, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    const updatedCount = await db<Resource>('resources').where({ id }).update({ name, description });
    if (updatedCount === 0) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }

    res.json({ id, name, description });
  } catch (error: any) {
    console.error('Error updating resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete('/resources/:id', validateIdParam, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedCount = await db<Resource>('resources').where({ id }).del();
    if (deletedCount === 0) {
      res.status(404).json({ error: 'Resource not found' });
      return;
    }

    res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting resource:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// For case user call wrong endpoint/method
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});

// Start
const PORT: number = Number(process.env.PORT);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
