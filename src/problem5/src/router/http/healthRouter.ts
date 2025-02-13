import { RestResponse, handleRes } from '@/helpers';
import { Router, type Response, type Request } from 'express';

import { Cradle } from '@/container';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { ServiceResponseSchema, createApiResponse } from '@/helpers/apidoc';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
    const restResponse = RestResponse.success(null, { message: 'ok' });
    handleRes(restResponse, res);
});

export const getHealthOpenAPI = (deps?: Cradle) => {
    const registry = new OpenAPIRegistry();
    registry.registerPath({
        tags: ['health'],
        method: 'get',
        description: "Check server health",
        path: '/health',
        responses: {
            [StatusCodes.OK]: createApiResponse(
                ServiceResponseSchema(z.object({})), 'ok',
            )
        }
    });

    return registry;
}