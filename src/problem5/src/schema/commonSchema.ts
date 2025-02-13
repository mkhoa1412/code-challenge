import { z } from 'zod';

export const CommonValidator = {
    id: z.string().uuid({
        message: 'Id must be UUID',
    }),
}

export const StringToNumValidator = () => z
    .coerce.number()

export const PagedValidator = {
    limit: StringToNumValidator()
        .refine(n => n > 0 && n <= 100, 'Limit must in range 1->100')
        .default(10)
    ,
    offset: StringToNumValidator()
        .refine(n => n >= 0, 'Offset must >= 0')
        .default(0)
    ,
}
