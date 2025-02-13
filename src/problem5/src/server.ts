import { Cradle } from '@/container';
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

// import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { unexpectedRequest, addErrorToRequestLog, sequelizeErrorHandler } from "@/middleware/errorHandler";
import { requestLogger } from '@/middleware/requestLogger';
import { env } from "@/config";
import { Server } from 'http';

export const getExpressApp = (deps: Cradle) => {
    const app: Express = express();

    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
    app.use(helmet());

    // // Request logging
    const reqLogger = requestLogger(deps);
    app.use(reqLogger);

    const { router } = deps;
    // Error handlers

    app.use('/health', router.healthRouter);
    app.use('/doc', router.getDocRouter(deps));
    app.use('/v1', router.getV1Router(deps));

    // // Swagger UI
    // app.use(openAPIRouter);

    // app.use(errorHandler());
    app.use(addErrorToRequestLog);
    app.use(sequelizeErrorHandler);
    app.use(unexpectedRequest);
    return app;
}

export const getServer = (deps: Cradle) => {
    const { express } = deps;
    const server: Server = express.listen(env.REST_PORT, (error) => {
        if (error) {
            throw error;
        }

        deps.logger.info(`API start: ${env.REST_PORT}`);
        return server;
    });

    return server;
}
