import z from "zod";
import { createValidatorFromZodSchema } from "~/app/validators";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const registerSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address" }),
	firstName: z.string().min(1, { message: "The first name must be not empty" }),
	lastName: z.string().min(1, { message: "The last name must be not empty" }),
	phone: z.string().regex(/^[\d\s()+-]+$/, { message: "Please enter a valid phone number" }),
});

const authValidtor = {
	login: createValidatorFromZodSchema(loginSchema, ["body"]),
	register: createValidatorFromZodSchema(registerSchema, ["body"]),
};

export default authValidtor;
