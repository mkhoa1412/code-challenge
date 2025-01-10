import { Resource } from '../models/Resource';
import { Op } from 'sequelize';

export class ResourceRepository {
    async createResource(data: { name: string; description?: string }) {
        return await Resource.create(data);
    }

    async getAllResources(filter?: { name?: string }) {
        return await Resource.findAll({
            where: filter?.name ? { name: { [Op.like]: `%${filter.name}%` } } : undefined,
        });
    }

    async getResourceById(id: number) {
        return await Resource.findByPk(id);
    }

    async updateResource(id: number, data: { name?: string; description?: string }) {
        const resource = await Resource.findByPk(id);
        if (!resource) return null;
        return await resource.update(data);
    }

    async deleteResource(id: number) {
        const resource = await Resource.findByPk(id);
        if (!resource) return null;
        await resource.destroy();
        return resource;
    }
}

