import { UnauthorizedError } from "~/errors/http";

export class NotFoundAuthUserError extends UnauthorizedError {
	constructor(message?: string) {
		super(message || "User not found");
	}
}

export class InvalidPasswordError extends UnauthorizedError {
	constructor(message?: string) {
		super(message || "Invalid password");
	}
}

export class MissingBearerTokenError extends UnauthorizedError {
	constructor(message?: string) {
		super(message || "Missing bearer token");
	}
}

export class UserIsPendingError extends UnauthorizedError {
	constructor(message?: string) {
		super(message || "User is pending");
	}
}

export class UserIsInactiveError extends UnauthorizedError {
	constructor(message?: string) {
		super(message || "User is inactive");
	}
}
