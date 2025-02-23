import { HttpStatus } from "~/enums/http";

export const isSuccessfulResponse = (status: HttpStatus) => {
	return status >= 200 && status < 300;
};
