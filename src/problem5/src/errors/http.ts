import { HttpStatus } from "~/enums/http";
import { AppError } from "~/errors/global";

export class HttpError extends AppError {
	protected status?: HttpStatus;

	public constructor(status?: HttpStatus, message?: string) {
		super("HttpError", message);
		this.status = status;
	}

	public getStatus() {
		return this.status || HttpStatus.InternalServerError;
	}
}

export class NotFoundError extends HttpError {
	public constructor(message?: string) {
		super(HttpStatus.NotFound, message);
	}
}

export class UnauthorizedError extends HttpError {
	public constructor(message?: string) {
		super(HttpStatus.Unauthorized, message);
	}
}

export class BadRequestError extends HttpError {
	public constructor(message?: string) {
		super(HttpStatus.BadRequest, message);
	}
}

export class ForbiddenError extends HttpError {
	public constructor(message?: string) {
		super(HttpStatus.Forbidden, message);
	}
}
