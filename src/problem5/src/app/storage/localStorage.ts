import fs from "node:fs";
import path from "path";
import { Stream } from "node:stream";
import { ReadableFile } from "~/app/file";
import { PathNotFoundError } from "~/errors/storage";
import { StorageDriver } from "~/types/app/storage";

type WriteData =
	| string
	| NodeJS.ArrayBufferView
	| Iterable<string | NodeJS.ArrayBufferView>
	| AsyncIterable<string | NodeJS.ArrayBufferView>
	| Stream;

const ENOENT = "ENOENT";

export const storagePath = (value?: string) => {
	return path.join(process.cwd(), "storage", value || "");
};

export class LocalStorageDriver implements StorageDriver {
	async put(filepath: string, data: WriteData): Promise<string> {
		const absolutepath = storagePath(filepath);
		const folder = path.dirname(absolutepath);

		if (!(await this.exist(folder))) {
			await fs.promises.mkdir(folder, { recursive: true });
		}
		await fs.promises.writeFile(absolutepath, data);

		return filepath;
	}

	async putAsFile(filepath: string, data: ReadableFile) {
		const stream = data.createReadStream();
		return await this.put(filepath, stream);
	}

	async access(value: string, mode?: number): Promise<boolean> {
		try {
			await fs.promises.access(value, mode ?? fs.constants.R_OK);
			return true;
		} catch (error: any) {
			if (error.code === ENOENT) {
				throw new PathNotFoundError(value);
			}

			throw error;
		}
	}

	async exist(value: string) {
		try {
			return await this.access(value);
		} catch (error) {
			if (error instanceof PathNotFoundError) {
				return false;
			}

			throw error;
		}
	}

	async mkdir(dir: string) {
		const absolutepath = storagePath(dir);
		return await fs.promises.mkdir(absolutepath, { recursive: true });
	}

	async readStream(filepath: string) {
		const absolutepath = storagePath(filepath);
		await this.access(absolutepath);

		return fs.createReadStream(absolutepath, {});
	}

	async read(filepath: string) {
		const absolutepath = storagePath(filepath);
		await this.access(absolutepath);

		return await fs.promises.readFile(absolutepath, {});
	}
}
