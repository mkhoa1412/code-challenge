import { ResourceRepository } from '../repositories/ResourceRepository';

export class ResourceService {
    private resourceRepository: ResourceRepository;

    constructor() {
        this.resourceRepository = new ResourceRepository();
    }

    async createResource(data: { name: string; description?: string }) {
        return await this.resourceRepository.createResource(data);
    }

    async getAllResources(filter?: { name?: string }) {
        return await this.resourceRepository.getAllResources(filter);
    }

    async getResourceById(id: number) {
        return await this.resourceRepository.getResourceById(id);
    }

    async updateResource(id: number, data: { name?: string; description?: string }) {
        return await this.resourceRepository.updateResource(id, data);
    }

    async deleteResource(id: number) {
        return await this.resourceRepository.deleteResource(id);
    }
}
