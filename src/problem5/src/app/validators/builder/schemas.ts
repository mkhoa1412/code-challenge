import z from "zod";
import { UploadedFile } from "~/app/http/file";
import builder from "~/app/validators/builder/builder";
import transforms from "~/app/validators/builder/transforms";
import { SortTypePagination } from "~/enums/data/paginate";

const schemas = {
	numeric: z
		.string()
		.refine((val) => !isNaN(Number(val)), {
			message: "Must be a numeric string",
		})
		.transform((val) => Number(val)),
	numericString: builder.numericString(),
	paginate: z.object({
		page: builder.number(),
		limit: builder.number(),
		keyword: z.string().optional(),
		sortColumn: z.string().optional(),
		sortType: z.enum([SortTypePagination.ASC, SortTypePagination.DESC]).optional(),
	}),
	boolean: z.union([z.boolean(), z.string().transform(transforms.stringToBoolean)]),
	requiredString: z.string().min(1, { message: "This field is required" }),
	file: z.instanceof(UploadedFile),
	geometryPointRaw: z
		.object({
			latitude: builder.number(true, "Latitude must be a number"),
			longitude: builder.number(true, "Longitude must be a number"),
		})
		.transform((value) => {
			const { latitude, longitude } = value;

			return {
				type: "Point",
				coordinates: [longitude, latitude],
			};
		}),
};

export default schemas;
