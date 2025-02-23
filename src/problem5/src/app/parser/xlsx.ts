import xlsx from "xlsx";
import { ReadableFile, File } from "~/app/file";

export default class XlsxParser extends ReadableFile {
	public constructor(file: File) {
		super(file.getFilePath());
	}

	public static fromFile(file: File) {
		return new XlsxParser(file);
	}

	public async parseJson<D = any>(options?: { raw?: boolean }) {
		const workbook = xlsx.readFile(this.getFilePath());
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];

		const data = xlsx.utils.sheet_to_json<D>(worksheet, { raw: options?.raw });

		return data;
	}
}
