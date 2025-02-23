import { BadRequestError, NotFoundError } from "~/errors/http";

export class EmailAlreadyExistsError extends BadRequestError {
	constructor() {
		super("Email already exists");
	}
}

export class NotFoundUserError extends NotFoundError {
	constructor() {
		super("User not found");
	}
}
