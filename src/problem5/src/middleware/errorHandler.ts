import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { RestResponse, handleRes } from "@/helpers";
import { env } from '@/config';
import { BaseError } from 'sequelize';

export const addErrorToRequestLog: ErrorRequestHandler = async (err, _req, res, next) => {
  res.locals.err = err;

  next();
};

export const unexpectedRequest: RequestHandler = async (_req, res, next) => {
  const err = res.locals.err;
  if (!err) {
    next();
  }

  if (env.NODE_ENV == 'prod') {
    delete err.stack;
  }

  handleRes(RestResponse.failure(err, {
    message: `Server error: ${err.message}`,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  }), res);
};

export const sequelizeErrorHandler: RequestHandler = async (_req, res, next) => {
  const err: BaseError & {
    errors?: { message: string, name: string}[]
  } | undefined = res.locals.err;

  if (!err) {
    next();
  }

  if (err instanceof BaseError) {
    const errors = (err.errors || []).map((e) => e.message);
    
    handleRes(RestResponse.failure(errors, {
      message: `${err.message}: ${errors}`,
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    }), res);
  } else {
    next(err);
  }
}