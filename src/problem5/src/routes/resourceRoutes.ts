import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';

const router = Router();
const resourceController = new ResourceController();

// POST /api/resources - Create a new resource
router.post('/', resourceController.createResource);

// GET /api/resources - Get all resources with optional filters
router.get('/', resourceController.getResources);

// GET /api/resources/:id - Get a specific resource by ID
router.get('/:id', resourceController.getResourceById);

// PUT /api/resources/:id - Update a resource
router.put('/:id', resourceController.updateResource);

// DELETE /api/resources/:id - Delete a resource
router.delete('/:id', resourceController.deleteResource);

export default router;
