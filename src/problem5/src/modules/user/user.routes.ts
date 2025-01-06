import * as express from "express";

import { authenticate } from "../../middleware/auth.middleware";
import * as userController from "./user.controller";

export const userRoutes = express.Router();

userRoutes.get("/", userController.getUserByIds);
userRoutes.get("/:userId", userController.getUserById);
userRoutes.put("/:userId", authenticate, userController.updateUser);
userRoutes.delete("/:userId", authenticate, userController.deleteUser);
