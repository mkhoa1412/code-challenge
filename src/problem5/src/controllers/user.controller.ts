// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserReqDto } from "../dtos/req/create-user-req.dto";
import { UpdateUserReqDto } from "../dtos/req/update-user-req.dto";
import { DetailUserResDto } from "../dtos/res/detail-user-res.dto";
import { ListUserResDto } from "../dtos/res/list-user-res.dto";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Create User
  async createUser(req: Request, res: Response): Promise<void> {
    const createUserDto: CreateUserReqDto = req.body;
    try {
      await this.userService.createUser(createUserDto);
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get All Users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: ListUserResDto = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get User Details
  async getDetailUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user: DetailUserResDto = await this.userService.getDetailUser(id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  // Update User
  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateUserDto: UpdateUserReqDto = req.body;
    try {
      await this.userService.updateUser(id, updateUserDto);
      res.status(200).json({ message: "User updated successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete User
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
