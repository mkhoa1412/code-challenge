import { Request, Response, RequestHandler } from 'express';
import Resource from '../models/resourceModel';

export const createResource: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const resource = new Resource(req.body);
    console.log(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};

export const listResources: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const resources = await Resource.find(req.query);
    res.status(200).json(resources);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};

export const getResource: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};
export const updateResource: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!resource) {
      res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};

export const deleteResource: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
};
