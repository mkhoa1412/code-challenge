import express from "express";
import { HttpStatus } from "~/enums/http";
import userRepository from "~/modules/user/userRepository";
import userService from "~/modules/user/userService";
import userTransformer from "~/modules/user/userTransformer";

const paginateUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const pagination = await userRepository.paginate({ ...request.schemaData });
		const data = await userTransformer.transformPaginate(pagination);

		return response.api({
			data,
		});
	} catch (error: unknown) {
		next(error);
	}
};

const detail = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const userId = request.params.userId;

		const user = await userService.forceGetUserById(userId);
		const data = await userTransformer.transformSingle(user);

		return response.api({
			data,
		});
	} catch (error: unknown) {
		next(error);
	}
};

const createUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const schemaData = request.schemaData;

		const user = await userService.createUser(schemaData);
		const data = await userTransformer.transformSingle(user);

		return response.api({
			status: HttpStatus.Created,
			data,
		});
	} catch (error: unknown) {
		next(error);
	}
};

const updateUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const userId = request.params.userId;
		const schemaData = request.schemaData;

		const user = await userService.updateUser({ ...schemaData, userId });
		const data = await userTransformer.transformSingle(user);

		return response.api({
			data,
		});
	} catch (error: unknown) {
		next(error);
	}
};

const updateStatus = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const userId = request.params.userId;
		const schemaData = request.schemaData;

		await userRepository.updateStatus({ userId, ...schemaData });

		return response.api({
			message: "User status has been updated",
		});
	} catch (error: unknown) {
		next(error);
	}
};

const destroy = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const userId = request.params.userId;
		await userService.destroy(userId);

		return response.api({});
	} catch (error: unknown) {
		next(error);
	}
};

const userController = { paginateUser, createUser, detail, updateUser, destroy, updateStatus };

export default userController;
