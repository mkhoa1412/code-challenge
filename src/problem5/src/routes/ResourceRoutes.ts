import express from 'express';
import { ResourceController } from '../controllers/ResourceController';

const router = express.Router();
const resourceController = new ResourceController();

// Create a resource
router.post('/', resourceController.createResource.bind(resourceController));

// List resources with basic filters
router.get('/', resourceController.getAllResources.bind(resourceController));

// Get details of a resource
router.get('/:id', resourceController.getResourceById.bind(resourceController));

// Update resource details
router.put('/:id', resourceController.updateResource.bind(resourceController));

// Delete a resource
router.delete('/:id', resourceController.deleteResource.bind(resourceController));

export default router;
