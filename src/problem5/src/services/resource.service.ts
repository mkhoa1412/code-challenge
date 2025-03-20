import { Repository } from "typeorm";
import { Resource } from "../models/resource.model";
import { AppDataSource } from "../config/ormconfig";
import { IFilter } from "../types/IFilter";

export class ResourceService {
    private resourceRepository: Repository<Resource>

    constructor() {
        this.resourceRepository = AppDataSource.getRepository(Resource)
    }

    async createResource(name: string): Promise<Resource> {
        const resource = this.resourceRepository.create({name})
        return await this.resourceRepository.save(resource)
    }

    async updateResource(id: number, name: string): Promise<Resource | null> {
        const resource = await this.resourceRepository.findOneBy({id})
        if (!resource) return null

        resource.name = name
        return await this.resourceRepository.save(resource)
    }

    async getDetailResource(id: number): Promise<Resource | null> {
        return await this.resourceRepository.findOneBy({id})
    }

    async deleteResource(id: number): Promise<boolean> {
        const res = await this.resourceRepository.delete(id)
        return res.affected !== 0
    }

    async listResource(filter: IFilter): Promise<Resource[]> {
        const queryBuilder = this.resourceRepository.createQueryBuilder("resource")

        if(filter.name) {
            queryBuilder.andWhere("resource.name LIKE :name", {name: `%${filter.name}%`})
        }

        return await queryBuilder.getMany()
    }
}