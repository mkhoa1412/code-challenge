import z from "zod";
import { createValidatorFromZodSchema } from "~/app/validators";
import schemas from "~/app/validators/builder/schemas";
import { SortTypePagination } from "~/enums/data/paginate";

export const paginateValidator = createValidatorFromZodSchema(
	z.object({
		page: z.union([z.number().int().positive(), schemas.numeric]).optional(),
		limit: z.union([z.number().int().positive(), schemas.numeric]).optional(),
		keyword: z.string().optional(),
		sortColumn: z.string().optional(),
		sortType: z.enum([SortTypePagination.ASC, SortTypePagination.DESC]).optional(),
	}),
	["query", "body"],
);
