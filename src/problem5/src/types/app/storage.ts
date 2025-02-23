import { ReadableFile } from "~/app/file";

export interface StorageDriver {
	put(filepath: string, content: any): Promise<string>;
	putAsFile(filepath: string, data: ReadableFile): Promise<string>;
	access(value: string): Promise<boolean>;
	mkdir(dir: string): Promise<string | undefined>;
	readStream(filepath: string): Promise<import("fs").ReadStream>;
	read(filepath: string): Promise<Buffer>;
}

export type AppStorageDriver = "local";
