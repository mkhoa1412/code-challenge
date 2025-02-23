import { AppError } from "~/errors/global";

export class PathNotFoundError extends AppError {
	public constructor(message?: string) {
		super("PathNotFound", message || "The path not found");
	}
}

export class StorageDriverNotImplemented extends AppError {
	public constructor(message?: string) {
		super("StorageDriverNotImplemented", message || "The storage driver is not implemented");
	}
}
