import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/AuthRequestContext';
import UserService from '../service/UserService';
import { Created, OK } from '../core/successResponse';

export const createUser = async (req: Request, res: Response) => {
  new Created({ metadata: await new UserService().create(req) }).send(res);
};

export const getAllUsers = async (_req: Request, res: Response) => {
  new OK({ metadata: await new UserService().getAll() }).send(res);
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  new OK({ metadata: await new UserService().getById(req) }).send(res);
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  return new UserService().update(req, res);
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  return new UserService().destroy(req, res);
};
