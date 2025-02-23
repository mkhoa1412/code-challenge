import express from "express";
import z from "zod";
import get from "lodash/get";
import { BadRequestError } from "~/errors/http";

type LocationRequest = "body" | "query" | "params" | "files";

export const createValidatorFromZodSchema = (schema: z.Schema, locations: LocationRequest[]) => {
	return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const data: any = (() => {
				if (Array.isArray(locations)) {
					const _data = {};
					locations.forEach((_) => Object.assign(_data, get(request, _, {})));

					return _data;
				}

				return {};
			})();

			const result = schema.safeParse(data);

			if (!result.success) {
				const validationContext: any = {};
				result.error?.errors.forEach((error) => {
					validationContext[error.path.join(".")] = error.message;
				});
				throw new BadRequestError(result.error.errors[0].message).withContexts({ validation: validationContext });
			}

			request.schemaData = result.data as any;
			return next();
		} catch (error: unknown) {
			return next(error);
		}
	};
};
