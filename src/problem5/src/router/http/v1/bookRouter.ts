import { Cradle } from '@/container';
import { Router } from 'express';
import { validateRequest } from '@/helpers';
import { CommonPagedSchema } from '@/schema/helpers';
import { UpdateBookValidator, CreateBookValidator, BookSchema, GetBookValidator, GetListBookValidator, UpdateBookPatchValidator } from '@/schema/bookSchema';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { createApiResponse } from '@/helpers/apidoc';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export const getBookRouter = (deps: Cradle) => {
    const bookRouter = Router();
    const { bookController } = deps.controllers;

    bookRouter
        .get('/',
            validateRequest(GetListBookValidator),
            bookController.getBooks
        )
        .post('/',
            validateRequest(CreateBookValidator),
            bookController.createBook
        )
        .get('/:id',
            validateRequest(GetBookValidator),
            bookController.getById
        )
        .put('/:id',
            validateRequest(UpdateBookValidator),
            bookController.updatePutBook,
        )
        .patch('/:id',
            validateRequest(UpdateBookPatchValidator),
            bookController.updatePatchBook,
        )
        .delete('/:id',
            validateRequest(GetBookValidator),
            bookController.deleteById
        )

    return bookRouter;
}

export const getBookOpenAPI = (deps?: Cradle) => {
    const resourceName = 'Book';
    const registry = new OpenAPIRegistry();
    const commonTags = [resourceName];

    registry.registerPath({
        tags: commonTags,
        method: 'get',
        description: 'Get all books (with filtered)',
        path: '/v1/books',
        request: {
            query: GetListBookValidator.shape.query
        },
        responses: {
            [StatusCodes.OK]: createApiResponse(
                CommonPagedSchema(BookSchema),
                'success'),
        }
    });

    registry.registerPath({
        tags: commonTags,
        method: 'get',
        description: 'Get a book by id',
        path: '/v1/books/:id',
        request: { params: UpdateBookValidator.shape.params },
        responses: {
            [StatusCodes.OK]: createApiResponse(BookSchema, 'success'),
            [StatusCodes.NOT_FOUND]: createApiResponse(z.null(), 'not_found'),
        }
    });

    registry.registerPath({
        tags: commonTags,
        method: 'delete',
        description: 'Delete a book by id',
        path: '/v1/books/:id',
        request: { params: GetBookValidator.shape.params },
        responses: {
            [StatusCodes.OK]: createApiResponse(z.null(), 'success'),
            [StatusCodes.NOT_FOUND]: createApiResponse(z.null(), 'not_found'),
        }
    });

    registry.registerPath({
        tags: commonTags,
        method: 'post',
        description: 'Create a book',
        path: '/v1/books',
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: CreateBookValidator.shape.body,
                    }
                }
            },
        },
        responses: {
            [StatusCodes.OK]: createApiResponse(BookSchema, 'success'),
            [StatusCodes.NOT_FOUND]: createApiResponse(z.null(), 'not_found'),
        }
    });


    registry.registerPath({
        tags: commonTags,
        description: 'Update a book',
        method: 'patch',
        path: '/v1/books/:id',
        request: {
            params: UpdateBookValidator.shape.params,
            body: {
                content: {
                    "application/json": {
                        schema: UpdateBookValidator.shape.body,
                    }
                }
            },
        },
        responses: {
            [StatusCodes.OK]: createApiResponse(BookSchema, 'success'),
            [StatusCodes.NOT_FOUND]: createApiResponse(z.null(), 'not_found'),
        }
    });

    return registry;
}