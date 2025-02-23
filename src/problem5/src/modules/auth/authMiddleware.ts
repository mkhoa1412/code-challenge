import express from "express";
import jwt from "jsonwebtoken";
import { APP_JWT_SECRET } from "~/constants/app";
import { UserStatus } from "~/enums/user";
import { UnauthorizedError } from "~/errors/http";
import { MissingBearerTokenError } from "~/errors/logic/auth";
import userRepository from "~/modules/user/userRepository";

const TOKEN_REGEX = /^Bearer\s(.+)$/;

const getTokenFromRequest = (request: express.Request) => {
	const authorization = request.headers["authorization"];
	if (!authorization || !TOKEN_REGEX.test(authorization)) {
		return null;
	}

	const token = authorization.match(TOKEN_REGEX)?.at(1) ?? null;

	return token;
};

const getIdFromToken = (token: string) => {
	const payload = jwt.verify(token, APP_JWT_SECRET) as any;
	if (!payload || !("userId" in payload)) {
		return null;
	}

	return payload.userId;
};

const attemp = async (request: express.Request) => {
	const token = getTokenFromRequest(request);
	if (!token) {
		throw new MissingBearerTokenError();
	}

	const userId = getIdFromToken(token);
	if (!userId) {
		throw new UnauthorizedError();
	}

	const user = await userRepository.findById(userId);
	if (!user || user.status !== UserStatus.Active) {
		throw new UnauthorizedError();
	}

	return user;
};

const authenticate = (required?: boolean) => {
	return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
		try {
			const user = await attemp(request);
			request.auth = { user };

			next();
		} catch (error: unknown) {
			if (required) {
				next(error);
			} else {
				next();
			}
		}
	};
};

const authMiddleware = { authenticate, required: authenticate(true), orNot: authenticate() };

export default authMiddleware;
