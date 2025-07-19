export interface Resource {
    id?: number;
    name: string;
    description: string;
    category: string;
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
}
export interface CreateResourceRequest {
    name: string;
    description: string;
    category: string;
    status?: 'active' | 'inactive';
}
export interface UpdateResourceRequest {
    name?: string;
    description?: string;
    category?: string;
    status?: 'active' | 'inactive';
}
export interface ResourceFilters {
    category?: string;
    status?: 'active' | 'inactive';
    search?: string;
    limit?: number;
    offset?: number;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
//# sourceMappingURL=index.d.ts.map