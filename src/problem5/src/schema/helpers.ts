import { z } from 'zod';

export type AttributesToZod<T extends object> = {
    [K in keyof T]?: z.ZodType<T[K]>
}

export const commonFields = {
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date(),
}

export const CommonPagedSchema = <T extends z.ZodTypeAny>(schema: T) => {
    return z.object({
        rows: z.array(schema),
        count: z.number(),
        offset: z.number(),
        limit: z.number(),
    })
}