import { Resource, CreateResourceRequest, UpdateResourceRequest, ResourceFilters } from '../types';
export declare class ResourceModel {
    private db;
    constructor();
    create(resourceData: CreateResourceRequest): Promise<Resource>;
    findById(id: number): Promise<Resource | null>;
    findAll(filters?: ResourceFilters): Promise<{
        resources: Resource[];
        total: number;
    }>;
    update(id: number, updateData: UpdateResourceRequest): Promise<Resource | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=Resource.d.ts.map