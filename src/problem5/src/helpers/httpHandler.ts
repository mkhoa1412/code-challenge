import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { RestResponse } from "@/helpers/restResponse";

export const handleRes = (restResponse: RestResponse<any>, response: Response): Promise<any> => {
  const {
    status,
    ...otherResponse
  } = restResponse;
  response.status(status).send(otherResponse);
  return;
};

export const asyncHandler = fn => (req: Request, res: Response, next?: NextFunction) => {
  return Promise
      .resolve(fn(req, res, next))
      .catch(next);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      body,
      query,
      params
    } = schema.parse({ body: req.body, query: req.query, params: req.params });

    req.body = body;
    req.query = query;
    req.params = params;

    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => `${e.path}: ${e.message}`).join(", ")}`;
    const restResponse = RestResponse.failure(null, {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: errorMessage,
    });

    return handleRes(restResponse, res);
  }
};
