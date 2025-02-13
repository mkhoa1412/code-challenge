import { z } from "zod";

import { RestResponse } from "./restResponse";
import { AttributesToZod } from "@/schema/helpers";

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object<AttributesToZod<RestResponse>>({
        success: z.boolean(),
        message: z.string(),
        data: dataSchema.optional(),
    });


export function createApiResponse(schema: z.ZodTypeAny, description: string) {
    return {
        description,
        content: {
            "application/json": {
                schema: ServiceResponseSchema(schema),
            },
        },
    };
}
