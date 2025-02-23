import { randomUUID } from "node:crypto";
import path from "node:path";
import { LocalStorageDriver } from "~/app/storage/localStorage";
import { StorageDriverNotImplemented } from "~/errors/storage";
import { AppStorageDriver, StorageDriver } from "~/types/app/storage";

const localStorage = new LocalStorageDriver();

const storage = (driver: AppStorageDriver) => {
	switch (driver) {
		case "local":
			return localStorage;
		default:
			throw new StorageDriverNotImplemented();
	}
};

const parseFileToken = (token: string) => {
	const [driver, space, path] = token.split(";");

	const [, driverValue] = driver.split("=");
	const [, spaceValue] = space.split("=");
	const [, pathValue] = path.split("=");

	return { space: spaceValue, path: pathValue, driver: driverValue };
};

const generateFileName = (options: { prefix?: string; extension?: string }) => {
	const prefix = options.prefix || "";
	const hash = randomUUID().replace(/-/g, "");
	return `${prefix}${Date.now().toString(36)}${hash}${options.extension || ""}`;
};

const generateStoragePath = (options: { space?: string; folder: string; fileName: string }) => {
	return path.join(options.space ?? "public", options.folder, options.fileName);
};

const generateFileToken = (options: { filepath: string; space?: string; fileName: string; driver?: StorageDriver }) => {
	const filePath = path.join(options.filepath, options.fileName);
	return `driver=${options.driver ?? "local"};space=${options.space || "app"};path=${filePath}`;
};

storage.localStorage = localStorage;
storage.parseFileToken = parseFileToken;
storage.generateFileName = generateFileName;
storage.generateFileToken = generateFileToken;
storage.generateStoragePath = generateStoragePath;

export default storage;
