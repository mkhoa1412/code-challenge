import * as express from "express";

import * as authController from "./auth.controller";

export const authRoutes = express.Router();

authRoutes.post("/", authController.signup);
authRoutes.get("/", authController.login);
