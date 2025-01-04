// src/routes/user.router.ts
import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();
const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserReqDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
userRouter.post("/", userController.createUser.bind(userController));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
userRouter.get("/", userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
userRouter.get("/:id", userController.getDetailUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserReqDto'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
userRouter.put("/:id", userController.updateUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete("/:id", userController.deleteUser.bind(userController));

export default userRouter;
