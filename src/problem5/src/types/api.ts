import { HttpStatus } from "~/enums/http";

export type APIResponseTransformOptions = {
	status?: HttpStatus;
	data?: object | any[] | string | number | null;
	message?: string;
};
