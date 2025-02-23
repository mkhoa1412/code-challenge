export class ThrowableError extends Error {
	constructor(name: string, message?: string) {
		super(message);
		this.name = name;
	}
}

export class AppError extends ThrowableError {
	protected contexts: Record<string, string | number> = {};

	constructor(name?: string, message?: string) {
		super(name || "App Error", message);
	}

	public withContexts(contexts: Record<string, string>) {
		Object.assign(this.contexts, contexts);
		return this;
	}

	public getContexts() {
		return this.contexts;
	}
}

export class MissingEnviromentError extends AppError {
	constructor(key: string) {
		super("MissingEnviromentError", "Missing key in file .env: " + key);
	}
}
