import Database from '../database/connection';
import { Resource, CreateResourceRequest, UpdateResourceRequest, ResourceFilters } from '../types';

export class ResourceModel {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  async create(resourceData: CreateResourceRequest): Promise<Resource> {
    const { name, description, category, status = 'active' } = resourceData;
    
    const query = `
      INSERT INTO resources (name, description, category, status)
      VALUES (?, ?, ?, ?)
    `;
    
    const result = await this.db.run(query, [name, description, category, status]);
    
    if (result.lastID) {
      const newResource = await this.findById(result.lastID);
      if (!newResource) {
        throw new Error('Failed to retrieve created resource');
      }
      return newResource;
    }
    
    throw new Error('Failed to create resource');
  }

  async findById(id: number): Promise<Resource | null> {
    const query = 'SELECT * FROM resources WHERE id = ?';
    const row = await this.db.get(query, [id]);
    return row || null;
  }

  async findAll(filters: ResourceFilters = {}): Promise<{ resources: Resource[], total: number }> {
    const { category, status, search, limit = 10, offset = 0 } = filters;
    
    let whereConditions: string[] = [];
    let params: any[] = [];
    
    if (category) {
      whereConditions.push('category = ?');
      params.push(category);
    }
    
    if (status) {
      whereConditions.push('status = ?');
      params.push(status);
    }
    
    if (search) {
      whereConditions.push('(name LIKE ? OR description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM resources ${whereClause}`;
    const countResult = await this.db.get(countQuery, params);
    const total = countResult.total;
    
    // Get paginated results
    const query = `
      SELECT * FROM resources 
      ${whereClause}
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?
    `;
    
    const resources = await this.db.all(query, [...params, limit, offset]);
    
    return { resources, total };
  }

  async update(id: number, updateData: UpdateResourceRequest): Promise<Resource | null> {
    const existingResource = await this.findById(id);
    if (!existingResource) {
      return null;
    }

    const updateFields: string[] = [];
    const params: any[] = [];

    if (updateData.name !== undefined) {
      updateFields.push('name = ?');
      params.push(updateData.name);
    }

    if (updateData.description !== undefined) {
      updateFields.push('description = ?');
      params.push(updateData.description);
    }

    if (updateData.category !== undefined) {
      updateFields.push('category = ?');
      params.push(updateData.category);
    }

    if (updateData.status !== undefined) {
      updateFields.push('status = ?');
      params.push(updateData.status);
    }

    if (updateFields.length === 0) {
      return existingResource;
    }

    params.push(id);
    
    const query = `
      UPDATE resources 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await this.db.run(query, params);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const existingResource = await this.findById(id);
    if (!existingResource) {
      return false;
    }

    const query = 'DELETE FROM resources WHERE id = ?';
    const result = await this.db.run(query, [id]);
    
    return result.changes !== undefined && result.changes > 0;
  }
}
