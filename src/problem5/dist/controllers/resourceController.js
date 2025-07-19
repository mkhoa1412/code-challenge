"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const Resource_1 = require("../models/Resource");
class ResourceController {
    constructor() {
        this.createResource = async (req, res) => {
            try {
                const resourceData = req.body;
                if (!resourceData.name || !resourceData.description || !resourceData.category) {
                    res.status(400).json({
                        success: false,
                        error: 'Name, description, and category are required'
                    });
                    return;
                }
                const newResource = await this.resourceModel.create(resourceData);
                res.status(201).json({
                    success: true,
                    data: newResource,
                    message: 'Resource created successfully'
                });
            }
            catch (error) {
                console.error('Error creating resource:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.getResources = async (req, res) => {
            try {
                const filters = {
                    category: req.query.category,
                    status: req.query.status,
                    search: req.query.search,
                    limit: req.query.limit ? parseInt(req.query.limit) : 10,
                    offset: req.query.offset ? parseInt(req.query.offset) : 0
                };
                Object.keys(filters).forEach(key => {
                    if (filters[key] === undefined) {
                        delete filters[key];
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
                });
            }
            catch (error) {
                console.error('Error fetching resources:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.getResourceById = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({
                        success: false,
                        error: 'Invalid resource ID'
                    });
                    return;
                }
                const resource = await this.resourceModel.findById(id);
                if (!resource) {
                    res.status(404).json({
                        success: false,
                        error: 'Resource not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: resource
                });
            }
            catch (error) {
                console.error('Error fetching resource:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.updateResource = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({
                        success: false,
                        error: 'Invalid resource ID'
                    });
                    return;
                }
                const updateData = req.body;
                const updatedResource = await this.resourceModel.update(id, updateData);
                if (!updatedResource) {
                    res.status(404).json({
                        success: false,
                        error: 'Resource not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: updatedResource,
                    message: 'Resource updated successfully'
                });
            }
            catch (error) {
                console.error('Error updating resource:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.deleteResource = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.status(400).json({
                        success: false,
                        error: 'Invalid resource ID'
                    });
                    return;
                }
                const deleted = await this.resourceModel.delete(id);
                if (!deleted) {
                    res.status(404).json({
                        success: false,
                        error: 'Resource not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: 'Resource deleted successfully'
                });
            }
            catch (error) {
                console.error('Error deleting resource:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        };
        this.resourceModel = new Resource_1.ResourceModel();
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=resourceController.js.map