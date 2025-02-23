import { MissingEnviromentError } from "~/errors/global";

export const getenv = (key: string) => {
	return process.env[key];
};

export const forceenv = (key: string) => {
	const value = getenv(key);

	if (typeof value !== "string") {
		throw new MissingEnviromentError(key);
	}

	return value;
};

export const env = (key: string, defaultValue?: any) => {
	const value = getenv(key);
	if (typeof value !== "string") {
		return defaultValue;
	}

	switch (value.toLowerCase()) {
		case "null":
			return null;
		case "false":
			return false;
		case "true":
			return true;
	}

	return value;
};
