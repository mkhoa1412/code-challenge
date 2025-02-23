import express from "express";
import authController from "~/modules/auth/authController";
import authMiddleware from "~/modules/auth/authMiddleware";
import authValidtor from "~/modules/auth/authValidator";

const authRouter = express.Router();

authRouter.post("/auth/login", authValidtor.login, authController.login);
authRouter.get("/auth/user", authMiddleware.required, authController.getAuthUser);

export default authRouter;
