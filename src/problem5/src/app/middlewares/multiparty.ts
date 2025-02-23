import express from "express";
import formidable from "formidable";
import typeis from "type-is";
import set from "lodash/set";
import { UploadedFile } from "~/app/http/file";

const parseField = (target: any, key: string, value?: any[]) => {
	if (key.endsWith("[]")) {
		const cleanKey = key.slice(0, -2);
		set(target, cleanKey, value);
	} else {
		set(target, key, value?.join(",") ?? undefined);
	}
};

const parseFile = (target: any, key: string, value?: any[]) => {
	if (key.endsWith("[]")) {
		const cleanKey = key.slice(0, -2);
		set(target, cleanKey, value);
	} else {
		set(target, key, Array.isArray(value) ? value[0] : value);
	}
};

const multiparty = async (request: express.Request, _response: express.Response, next: express.NextFunction) => {
	try {
		request.files = {};

		// Check if request is multipart
		if (!typeis(request, ["multipart"])) {
			return next();
		}

		const form = formidable({ keepExtensions: true });
		const [fields, files] = await form.parse(request);

		// Assign fields to body of request
		for (const key in fields) {
			const value = fields[key];
			parseField(request.body, key, value);
		}

		// Assign file formdata to file of request
		for (const key in files) {
			const value = files[key];
			if (value instanceof Array && value.length > 0) {
				const uploadedFiles = value.map((fileinfo) =>
					UploadedFile.fromFileInfo({
						filepath: fileinfo.filepath,
						newFilename: fileinfo.newFilename,
						mimetype: fileinfo.mimetype,
						originalFilename: fileinfo.originalFilename,
						size: fileinfo.size,
					}),
				);

				parseFile(request.body, key, uploadedFiles);
			}
		}

		// Assign files to body of request
		if (request.body) {
			Object.assign(request.body, request.files);
		}

		next();
	} catch (error) {
		next(error);
	}
};

export default multiparty;
