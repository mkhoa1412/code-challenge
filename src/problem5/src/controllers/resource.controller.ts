import {Request, Response} from 'express'
import { ResourceService } from '../services/resource.service';
import { IFilter } from '../types/IFilter';

const resourceService = new ResourceService()

export const create = async (req: Request, res: Response): Promise<void> => {
    const {name} = req.body;
    try {
        const resource = await resourceService.createResource(name)
        res.status(201).json(resource)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const update = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params
    const {name} = req.body
    try {
        const resource = await resourceService.updateResource(+id, name)
        res.status(200).json(resource)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    } 
}

export const getDetail = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const resource = await resourceService.getDetailResource(Number(id));
        if (!resource) {
            res.status(404).json({ message: "Resource not found" });
        }
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const remove = async (req: Request, res: Response): Promise<void > => {
    const { id } = req.params;
    try {
        const success = await resourceService.deleteResource(Number(id));
        if (!success) {
            res.status(404).json({ message: "Resource not found" });
        }
        res.json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const list = async (req: Request, res: Response): Promise<void> => {
    try {
        const filter: IFilter = {
            name: req.query.name as string,
        };
        const resources = await resourceService.listResource(filter);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};