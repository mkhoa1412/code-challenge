import { Request, Response } from 'express';
import { ResourceService } from '../services/ResourceService';

export class ResourceController {
    private resourceService: ResourceService;

    constructor() {
        this.resourceService = new ResourceService();
    }

    async createResource(req: Request, res: Response) {
        const { name, description } = req.body;
        try {
            const newResource = await this.resourceService.createResource({ name, description });
            res.status(201).json(newResource);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create resource' });
        }
    }

    async getAllResources(req: Request, res: Response) {
        const { name } = req.query;
        try {
            const resources = await this.resourceService.getAllResources({ name: name as string });
            res.status(200).json(resources);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch resources' });
        }
    }

    async getResourceById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const resource = await this.resourceService.getResourceById(Number(id));
            if (!resource) {
                res.status(404).json({ error: 'Resource not found' });
            } else {
                res.status(200).json(resource);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch resource details' });
        }
    }

    async updateResource(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const updatedResource = await this.resourceService.updateResource(Number(id), { name, description });
            if (!updatedResource) {
                res.status(404).json({ error: 'Resource not found' });
            } else {
                res.status(200).json(updatedResource);
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update resource' });
        }
    }

    async deleteResource(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedResource = await this.resourceService.deleteResource(Number(id));
            if (!deletedResource) {
                res.status(404).json({ error: 'Resource not found' });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete resource' });
        }
    }
}
    