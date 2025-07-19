import { Request, Response } from 'express';
import { ResourceModel } from '../models/Resource';
import { CreateResourceRequest, UpdateResourceRequest, ResourceFilters, ApiResponse, PaginatedResponse, Resource } from '../types';

export class ResourceController {
  private resourceModel: ResourceModel;

  constructor() {
    this.resourceModel = new ResourceModel();
  }

  // Create a new resource
  createResource = async (req: Request, res: Response): Promise<void> => {
    try {
      const resourceData: CreateResourceRequest = req.body;
      
      // Basic validation
      if (!resourceData.name || !resourceData.description || !resourceData.category) {
        res.status(400).json({
          success: false,
          error: 'Name, description, and category are required'
        } as ApiResponse<null>);
        return;
      }

      const newResource = await this.resourceModel.create(resourceData);
      
      res.status(201).json({
        success: true,
        data: newResource,
        message: 'Resource created successfully'
      } as ApiResponse<Resource>);
    } catch (error) {
      console.error('Error creating resource:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse<null>);
    }
  };

  // Get all resources with filters
  getResources = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: ResourceFilters = {
        category: req.query.category as string,
        status: req.query.status as 'active' | 'inactive',
        search: req.query.search as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0
      };

      // Remove undefined values
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof ResourceFilters] === undefined) {
          delete filters[key as keyof ResourceFilters];
        }
      });

      const { resources, total } = await this.resourceModel.findAll(filters);
      
      const limit = filters.limit || 10;
      const offset = filters.offset || 0;
      
      res.status(200).json({
        success: true,
        data: resources,
        pagination: {
          total,
          limit,
          offset,
          hasNext: offset + limit < total,
          hasPrev: offset > 0
        }
      } as PaginatedResponse<Resource>);
    } catch (error) {
      console.error('Error fetching resources:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse<null>);
    }
  };

  // Get a single resource by ID
  getResourceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid resource ID'
        } as ApiResponse<null>);
        return;
      }

      const resource = await this.resourceModel.findById(id);
      
      if (!resource) {
        res.status(404).json({
          success: false,
          error: 'Resource not found'
        } as ApiResponse<null>);
        return;
      }

      res.status(200).json({
        success: true,
        data: resource
      } as ApiResponse<Resource>);
    } catch (error) {
      console.error('Error fetching resource:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse<null>);
    }
  };

  // Update a resource
  updateResource = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid resource ID'
        } as ApiResponse<null>);
        return;
      }

      const updateData: UpdateResourceRequest = req.body;
      
      const updatedResource = await this.resourceModel.update(id, updateData);
      
      if (!updatedResource) {
        res.status(404).json({
          success: false,
          error: 'Resource not found'
        } as ApiResponse<null>);
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedResource,
        message: 'Resource updated successfully'
      } as ApiResponse<Resource>);
    } catch (error) {
      console.error('Error updating resource:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse<null>);
    }
  };

  // Delete a resource
  deleteResource = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid resource ID'
        } as ApiResponse<null>);
        return;
      }

      const deleted = await this.resourceModel.delete(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'Resource not found'
        } as ApiResponse<null>);
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Resource deleted successfully'
      } as ApiResponse<null>);
    } catch (error) {
      console.error('Error deleting resource:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      } as ApiResponse<null>);
    }
  };
}
