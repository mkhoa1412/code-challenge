import path from "path";
import { ReadableFile } from "~/app/file";

export interface ClientFileInfo {
	size: number;
	filepath: string;
	originalFilename: string | null;
	newFilename: string;
	mimetype: string | null;
}

export class HttpFile extends ReadableFile {
	protected constructor(path: string) {
		super(path);
	}
}

export class UploadedFile extends HttpFile {
	private fileinfo: ClientFileInfo;

	public constructor(fileinfo: ClientFileInfo) {
		super(fileinfo.filepath);
		this.fileinfo = fileinfo;
	}

	public static fromFileInfo(fileinfo: ClientFileInfo) {
		return new UploadedFile(fileinfo);
	}

	public getClientSize() {
		return this.fileinfo.size;
	}

	public getClientOriginName() {
		return this.fileinfo.originalFilename;
	}

	public getClientExt() {
		if (!this.fileinfo.originalFilename) {
			return null;
		}

		return path.extname(this.fileinfo.originalFilename);
	}

	public getClientMime() {
		return this.fileinfo.mimetype;
	}
}
