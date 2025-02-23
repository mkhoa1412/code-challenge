import path from "path";
import fs from "fs";

export class File {
	protected path: string;

	public constructor(path: string) {
		this.path = path;
	}

	public getFilePath() {
		return this.path;
	}

	public getFileName() {
		return path.basename(this.path);
	}

	public getExtName() {
		return path.extname(this.path);
	}

	public async stat() {
		return await fs.promises.stat(this.path);
	}

	public async isFile() {
		return (await this.stat()).isFile;
	}

	public async isDirectory() {
		return (await this.stat()).isDirectory;
	}

	public async getMTime() {
		return (await this.stat()).mtime;
	}

	public async unlink() {
		return await fs.promises.unlink(this.path);
	}
}

export class ReadableFile extends File {
	public constructor(path: string) {
		super(path);
	}

	public async read(options?: { encoding?: BufferEncoding }) {
		return await fs.promises.readFile(this.path, {
			encoding: options?.encoding,
		});
	}

	public async readAsEncoding(encoding: BufferEncoding) {
		return await fs.promises.readFile(this.path, encoding);
	}

	public async readAsBuffer() {
		return await fs.promises.readFile(this.path);
	}

	public createReadStream() {
		return fs.createReadStream(this.path);
	}

	public async readAsBlob() {
		return await fs.openAsBlob(this.path);
	}
}

export class WriteableFile extends File {
	public constructor(path: string) {
		super(path);
	}

	public async write(content: any) {
		return await fs.promises.writeFile(this.path, content);
	}
}
