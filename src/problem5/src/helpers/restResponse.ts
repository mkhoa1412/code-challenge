import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class RestResponse<T = null> {
    readonly success: boolean;
    readonly message: string;
    readonly data: T;
    readonly status: number;

    private constructor(success: boolean, options: {
        message?: string,
        status?: number
        data: T,
    }) {

        const {
            message,
            status = success ? StatusCodes.OK : StatusCodes.BAD_REQUEST,
            data,
        } = options;
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status;
    }

    static success<T>(data: T, opt?: {
        message?: string,
        status?: number
    }) {
        const { message = 'success', status = StatusCodes.OK } = opt || {};
        return new RestResponse(true, { data, message, status });
    }

    static failure<T>(data: T, opt: {
        message?: string,
        status: number
    }) {
        const { message = 'error', status = StatusCodes.BAD_REQUEST } = opt;
        return new RestResponse(false, { message, data, status });
    }
}

export const RestResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        success: z.boolean(),
        message: z.string(),
        data: schema.optional(),
        status: z.number(),
    });
