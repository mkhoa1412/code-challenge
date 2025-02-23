import express from "express";
import { HttpStatus } from "~/enums/http";
import { AppError } from "~/errors/global";
import { HttpError, NotFoundError, UnauthorizedError } from "~/errors/http";
import { isSuccessfulResponse } from "~/utils/api";

const register = (request: express.Request, response: express.Response, next: express.NextFunction) => {
	response.api = (options) => {
		const status = options.status || HttpStatus.OK;
		const data = options.data;

		return response.status(status).json({
			data,
			message: options.message || null,
			status: status,
			success: isSuccessfulResponse(status),
		});
	};

	request.schemaData = {};
	request.forceGetAuthUser = () => {
		const user = request.auth?.user;
		if (!user) {
			throw new UnauthorizedError();
		}

		return user;
	};

	return next();
};

const handleNotFound = (request: express.Request, response: express.Response, next: express.NextFunction) => {
	next(new NotFoundError());
};

const handleError = async (
	error: unknown,
	request: express.Request,
	response: express.Response,
	next: express.NextFunction,
) => {
	const status = (() => {
		if (error instanceof HttpError) {
			return error.getStatus();
		}

		return HttpStatus.InternalServerError;
	})();

	const contexts = (() => {
		if (error instanceof AppError) {
			return error.getContexts();
		}

		return {};
	})();

	if (error instanceof Error) {
		return response.status(status).json({
			status,
			message: null,
			success: false,
			error: {
				name: error.constructor.name,
				message: error.message,
				stack: error.stack,
				contexts,
			},
		});
	}

	return next(error);
};

export const apiMiddleware = { register, handleNotFound, handleError };

export default apiMiddleware;
