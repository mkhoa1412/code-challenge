import express from "express";
import apiMiddleware from "~/middlewares/api";
import authRouter from "~/modules/auth/authRoutes";
import userRouter from "~/modules/user/userRoutes";

const apiRouter = express.Router();
apiRouter.use(apiMiddleware.register);

// Declare controller
apiRouter.use(authRouter);
apiRouter.use(userRouter);
apiRouter.use(apiMiddleware.handleNotFound, apiMiddleware.handleError);

export default apiRouter;
