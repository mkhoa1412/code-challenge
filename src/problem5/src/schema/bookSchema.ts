import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { BookAttributes } from "@/db/pg/models/bookModel";
import { z } from 'zod';
import { AttributesToZod, commonFields } from './helpers';
import { CommonValidator, PagedValidator } from './commonSchema';

extendZodWithOpenApi(z);

const titleValidator = z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
}).max(2000, { message: "Must be 2000 or fewer characters long" });

export const BookSchema = z.object<AttributesToZod<BookAttributes>>({
    ...commonFields,

    author: z.string().optional(),
    title: titleValidator,
    description: z.string().optional(),
});

export const GetListBookValidator = z.object({
    query: z.object({
        ...PagedValidator,
        author: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
    }),
})

export const CreateBookValidator = z.object({
    body: BookSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
    }),
});

export const GetBookValidator = z.object({
    params: z.object({
        id: CommonValidator.id,
    }),
})

export const UpdateBookValidator = z.object({
    params: z.object({
        id: CommonValidator.id,
    }),
    body: BookSchema.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true }),
    // body: z.object({
    //     title: titleValidator,
    // }),
})

export const UpdateBookPatchValidator = z.object({
    params: z.object({
        id: CommonValidator.id,
    }),
    body: BookSchema.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true }).partial(),
    // body: z.object({
    //     title: titleValidator,
    // }),
})