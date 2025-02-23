import z from "zod";
import { createValidatorFromZodSchema } from "~/app/validators";
import schemas from "~/app/validators/builder/schemas";
import { UserStatus } from "~/enums/user";

const inputSchema = z.object({
	firstName: z.string().min(1, { message: "The first name must be not empty" }).optional(),
	lastName: z.string().min(1, { message: "The last name must not be empty" }).optional(),
	email: z.string().email({ message: "Please enter a valid email address" }),
	password: z.string().min(6, { message: "The password must be at least 6 characters" }),
	phone: z
		.string()
		.regex(/^[\d\s()+-]+$/, { message: "Please enter a valid phone number" })
		.optional(),
	status: z.nativeEnum(UserStatus).optional(),
});

const updateSchema = inputSchema.partial();

const paginateSchema = schemas.paginate.merge(
	z.object({
		status: z.nativeEnum(UserStatus).optional(),
	}),
);

const updateStatusSchema = z.object({
	status: z.nativeEnum(UserStatus),
});

const userValidator = {
	createUser: createValidatorFromZodSchema(inputSchema, ["body"]),
	updateUser: createValidatorFromZodSchema(updateSchema, ["body"]),
	paginateUser: createValidatorFromZodSchema(paginateSchema, ["query"]),
	updateStatus: createValidatorFromZodSchema(updateStatusSchema, ["body"]),
};

export default userValidator;
