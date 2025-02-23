import express from "express";
import authMiddleware from "~/modules/auth/authMiddleware";
import userController from "~/modules/user/userController";
import userValidator from "~/modules/user/userValidator";

const userRouter = express.Router();

userRouter.get("/users", userValidator.paginateUser, userController.paginateUser);
userRouter.get("/users/:userId", userController.detail);
userRouter.post("/users", userValidator.createUser, userController.createUser);
userRouter.put("/users/:userId", userValidator.updateUser, userController.updateUser);
userRouter.patch(
	"/users/:userId/status",
	authMiddleware.required,
	userValidator.updateStatus,
	userController.updateStatus,
);
userRouter.delete("/users/:userId", userController.destroy);

export default userRouter;
