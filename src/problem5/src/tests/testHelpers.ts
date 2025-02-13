import container, { Cradle } from "@/container";
import { createRequest, RequestOptions, createResponse, ResponseOptions } from "node-mocks-http";

export const getMockContainer = (deps?: Cradle): Cradle => {
    return {
        ...container.cradle,
        logger: {
            child: jest.fn().mockReturnThis(),
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        },
        ...(deps || {}),
        // db: {
        //     getRepository: jest.fn().mockReturnThis(),
        // },
        // server: undefined,
        // services: {
        //     bookService: {
        //         getAll: jest.fn(),
        //         getById: jest.fn().mockRejectedValue(new Error('Book not found')),
        //     }
        // },
        // repository: {
        //     bookRepository: {
        //         findAndCountAll: jest.fn().mockResolvedValue({ count: 1, rows: [] }),
        //         findByPk: jest.fn().mockResolvedValue(null),
        //     }
        // }
    // }
    } as unknown as Cradle
};

export const getMockRequest = (opts?: RequestOptions) => {
    return createRequest(opts)
}

export const getMockResponse = (opts?: ResponseOptions) => {
    return createResponse(opts);
}

