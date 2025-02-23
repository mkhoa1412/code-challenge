import { UserStatus } from "~/enums/user";

export type UserInput = {
	email: string;
	firstName?: string;
	lastName?: string;
	password: string;
	status?: UserStatus;
	phone?: string;
};
