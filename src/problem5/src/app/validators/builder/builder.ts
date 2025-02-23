import z from "zod";
import transforms from "~/app/validators/builder/transforms";

const builder = {
	number: (required?: boolean, message?: string) => {
		return z
			.optional(z.union([z.string().transform(transforms.emptyStringToUndefined), z.number()]))
			.transform((value) => {
				if (value === undefined || value === "") {
					return void 0;
				}

				return Number(value);
			})
			.refine(
				(value) => {
					if (required && typeof value !== "number") {
						return false;
					}

					if (typeof value === "number" && isNaN(value)) {
						return false;
					}

					return true;
				},
				{ message: message || "This field must be a number" },
			);
	},
	numericString: (message?: string) => z.string().regex(/^\d*$/, { message }),
	geometryFeature: (message?: string) =>
		z
			.object({
				type: z.string().refine((value) => value === "Feature", { message }),
				geometry: z.object(
					{
						type: z.string(),
						coordinates: z.any(),
					},
					{ message },
				),
			})
			.optional(),
};

export default builder;
