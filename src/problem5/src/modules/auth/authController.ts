import express from "express";
import authTransformer from "~/modules/auth/authTransformer";
import authService from "~/modules/auth/authService";

const login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const email = request.body.email as string;
		const password = request.body.password as string;

		const { user, accessToken } = await authService.loginByCredentials(email, password);

		return response.api({
			data: {
				accessToken,
				userId: user.userId,
				email: user.email,
			},
		});
	} catch (error: unknown) {
		next(error);
	}
};

const getAuthUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
	try {
		const user = request.forceGetAuthUser();
		const data = await authTransformer.transformAuthUser(user);

		return response.api({
			data,
		});
	} catch (error: unknown) {
		next(error);
	}
};

const authController = { login, getAuthUser };

export default authController;
