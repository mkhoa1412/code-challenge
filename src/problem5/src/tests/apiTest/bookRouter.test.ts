import supertest from 'supertest';
import '@/config';
import { Cradle } from '@/container';
import { createTypedContainer, TypedAwilixContainer } from '@/container/container.utils';
import { getMockContainer, getMockApp, getCommonHeaders } from '../testHelpers/serverHelper';
import { RestResponse } from '@/helpers';
import { BookAttributes } from '@/db/pg/models/bookModel';

import { getMockBookRepository } from '../testHelpers/repositoryHelper';
import { ValidationError, ValidationErrorItem } from 'sequelize';

describe('BookRouter', () => {
    let app: supertest;
    let container: TypedAwilixContainer<any>;
    let cradle: Cradle;
    let commonHeaders: { [key: string]: string }

    let bookRepository: ReturnType<typeof getMockBookRepository>

    let mockBooks = [
        {
            id: '2dbb6b06-0430-4244-b0d1-55f2a878e638',
            title: 'book title 1',
            description: 'book description 1',
            author: 'book author 1'
        },
        {
            id: '36147659-baf0-4dd5-b45d-bae7b92f2047',
            title: 'book title 2',
            description: 'book description 2',
            author: 'book author 2'
        },
    ]

    beforeEach(() => {
        jest.resetModules();
        container = getMockContainer();
        app = getMockApp(container.cradle as Cradle);
        cradle = container.cradle as Cradle;
        bookRepository = cradle.repository.bookRepository as any;
        commonHeaders = getCommonHeaders()
    })

    describe('GET /v1/books', () => {
        it('should return a 200 with list of books', async () => {
            const expectedRes = { count: 2, rows: mockBooks };
            bookRepository.findAndCountAll.mockResolvedValue(expectedRes);

            const response = await app.get('/v1/books');

            expect(bookRepository.findAndCountAll).toHaveBeenCalledTimes(1);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({
                success: true,
                data: expectedRes,
                message: 'success',
            });
        });

        it('should return a 200 with no books', async () => {
            const expectedRes = { count: 0, rows: [] };
            bookRepository.findAndCountAll.mockResolvedValue(expectedRes);

            const response = await app.get('/v1/books');

            expect(bookRepository.findAndCountAll).toHaveBeenCalled();
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({
                success: true,
                data: expectedRes,
                message: 'success',
            });
        });

        it('should return call db with correct filter', async () => {
            const expectedRes = { count: 0, rows: [] };
            bookRepository.findAndCountAll.mockResolvedValue(expectedRes);

            const q = {
                author: 'book author 3',
                description: 'Book description',
                title: 'book title 3',
            };
            const pageOpts = {
                offset: 1,
                limit: 1,
            }

            const response = await app.get('/v1/books').query({
                ...q,
                ...pageOpts,
            })

            expect(bookRepository.findAndCountAll).toHaveBeenCalledWith({
                where: q,
                ...pageOpts,
                raw: true,
            });

            expect(response.status).toEqual(200);
            expect(response.body).toEqual({
                success: true,
                data: expectedRes,
                message: 'success',
            });
        })
        
        /**
         * offset / limit should be bringing to a common file.
         */
        it('should return 422 on invalid query on offset', async () => {
            const response = await app.get('/v1/books').query({
                offset: -1,
            });

            expect(bookRepository.findAndCountAll).not.toHaveBeenCalled();
            expect(response.status).toEqual(422);

            expect(response.body.message).toMatch('Invalid input');
            expect(response.body.data).toEqual(null);
            expect(response.body.success).toEqual(false);
        });
        
        it('should return 422 on invalid query on limit', async () => {
            const response = await app.get('/v1/books').query({
                limit: -1,
            });

            expect(bookRepository.findAndCountAll).not.toHaveBeenCalled();
            expect(response.status).toEqual(422);

            expect(response.body.message).toMatch('Invalid input');
            expect(response.body.data).toEqual(null);
            expect(response.body.success).toEqual(false);
        });
    })

    describe('GET /v1/books/:id', () => {

        it('should return a 404 on Non existed id', async () => {
            const id = '36147659-baf0-4dd5-b45d-bae7b92f2047';
            bookRepository.findByPk.mockResolvedValue(null);

            const response = await app.get(`/v1/books/${id}`);

            expect(bookRepository.findByPk).toHaveBeenCalledWith(id, { raw: true });
            expect(response.status).toEqual(404);
            expect(response.body).toEqual({
                success: false,
                data: null,
                message: 'Book not found',
            });
        });

        it('should return a 422 on Invalid id', async () => {
            const id = 'id';
            const response = await app.get(`/v1/books/${id}`);

            expect(response.status).toEqual(422);
            expect(response.body.message).toMatch('Invalid input: ');
        });

        it('should return a 200 on found book', async () => {
            const id = '36147659-baf0-4dd5-b45d-55f2a878e638';
            bookRepository.findByPk.mockResolvedValue(mockBooks[0]);

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.get(`/v1/books/${id}`).query({ id });

            expect(bookRepository.findByPk).toHaveBeenCalledWith(id, { raw: true });
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('success');
            expect(response.body.data).toEqual(mockBooks[0]);
            expect(response.body.success).toEqual(true);
        });
    });

    describe('POST /v1/books', () => {
        it('should return a 422 on missing required fields', async () => {
            const book = {
                description: 'New Book Description',
            } as BookAttributes;

            const response = await app.post('/v1/books').send(book);

            expect(bookRepository.create).not.toHaveBeenCalled();
            expect(response.status).toEqual(422);
            expect(response.body.message).toMatch('Invalid input');
            expect(response.body.data).toEqual(null);
            expect(response.body.success).toEqual(false);
        })

        it('should return a 201 on successful book creation', async () => {
            const book = {
                title: 'New Book',
                description: 'New Book Description',
                author: 'New Book Author',
            } as BookAttributes;

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.post('/v1/books').send(book);

            expect(bookRepository.create).toHaveBeenCalledWith(book, {
                returning: true,
            });
            expect(response.status).toEqual(201);
            expect(response.body.message).toEqual('success');
            // expect(response.body.data).toEqual(book);
            expect(response.body.success).toEqual(true);
        })

        it('should return 422 on duplicate book title', async () => {
            const book = {
                title: 'Book Title',
                description: 'New Book Description',
                author: 'New Book Author',
            } as BookAttributes;

            bookRepository.create.mockRejectedValue(new ValidationError('Validation error', [
                { message: 'Duplicate id' } as ValidationErrorItem
            ]));

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.post('/v1/books').send(book);

            expect(bookRepository.create).toHaveBeenCalledWith(book, { returning: true });
            expect(response.status).toEqual(422);
            expect(response.body.success).not.toBeTruthy();
            expect(response.body.message).toMatch('Validation error');
            expect(response.body.data).toHaveLength(1);
        })
    })

    describe('DELETE /v1/books/:id', () => {
        it('should return 200 on successful book deletion', async () => {
            const id = '36147659-baf0-4dd5-b45d-55f2a878e638';
            bookRepository.destroy.mockResolvedValue(1);

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.delete(`/v1/books/${id}`);

            expect(bookRepository.destroy).toHaveBeenCalledWith({ where: { id } });
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('success');
            expect(response.body.success).toEqual(true);
            expect(response.body.data).toEqual(1);
        })

        it('should return 404 on non-existent book', async () => {
            const id = '36147659-baf0-4dd5-b45d-bae7b92f2047';
            bookRepository.destroy.mockResolvedValue(0);

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.delete(`/v1/books/${id}`);

            expect(bookRepository.destroy).toHaveBeenCalledWith({ where: { id } });
            expect(response.status).toEqual(404);
            expect(response.body.message).toEqual('Book not found');
            expect(response.body.success).toEqual(false);
            expect(response.body.data).toEqual(0);
        })
    })

    describe('PUT /v1/books/:id', () => {
        it('should return 422 on missing required fields', async () => {
            const book = {
                description: 'Updated Book Description',
            } as BookAttributes;

            const response = await app.put(`/v1/books/123`).send(book);

            expect(bookRepository.update).not.toHaveBeenCalled();
            expect(response.status).toEqual(422);
            expect(response.body.message).toMatch('Invalid input');
            expect(response.body.data).toEqual(null);
            expect(response.body.success).toEqual(false);
        })
        it('should return 404 on non-existent book', async () => {
            const book = {
                title: 'Updated Book',
                description: 'Updated Book Description',
                author: 'Updated Book Author',
            } as BookAttributes;

            bookRepository.update.mockResolvedValue([0, []]);
            const id = '36147659-baf0-4dd5-b45d-bae7b92f2047';

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.put(`/v1/books/${id}`).send(book);

            expect(bookRepository.update).toHaveBeenCalledWith(book, { where: { id }, returning: true });
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch('No book found');
            expect(response.body.success).toEqual(false);
            expect(response.body.data).toEqual(null);
        })
        it('should return 200 on successful book update', async () => {
            const book = {
                title: 'Updated Book',
                description: 'Updated Book Description',
                author: 'Updated Book Author',
            } as BookAttributes;

            bookRepository.update.mockResolvedValue([1, [book]]);
            const id = '36147659-baf0-4dd5-b45d-55f2a878e638';

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.put(`/v1/books/${id}`).send(book);

            expect(bookRepository.update).toHaveBeenCalledWith(book, { where: { id }, returning: true });
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('success');
            expect(response.body.success).toEqual(true);
            expect(response.body.data).toEqual(book);
        })
    })

    describe('PATCH /v1/books/:id', () => {
        it('should return 422 on missing required fields', async () => {
            const book = {
                description: 'Updated Book Description',
            } as BookAttributes;

            const response = await app.patch(`/v1/books/123`).send(book);

            expect(bookRepository.update).not.toHaveBeenCalled();
            expect(response.status).toEqual(422);
            expect(response.body.message).toMatch('Invalid input');
            expect(response.body.data).toEqual(null);
            expect(response.body.success).toEqual(false);
        })
        it('should return 404 on non-existent book', async () => {
            const book = {
                title: 'Updated Book',
                description: 'Updated Book Description',
                author: 'Updated Book Author',
            } as BookAttributes;

            bookRepository.update.mockResolvedValue([0, []]);
            const id = '36147659-baf0-4dd5-b45d-bae7b92f2047';

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.patch(`/v1/books/${id}`).send(book);

            expect(bookRepository.update).toHaveBeenCalledWith(book, { where: { id }, returning: true, individualHooks: true });
            expect(response.status).toEqual(404);
            expect(response.body.message).toMatch('No book found');
            expect(response.body.success).toEqual(false);
            expect(response.body.data).toEqual(null);
        })
        it('should return 200 on successful book update', async () => {
            const book = {
                title: 'Updated Book',
                description: 'Updated Book Description',
                author: 'Updated Book Author',
            } as BookAttributes;

            bookRepository.update.mockResolvedValue([1, [book]]);
            const id = '36147659-baf0-4dd5-b45d-55f2a878e638';

            const response: {
                status: number,
                body: RestResponse<BookAttributes>
            } = await app.patch(`/v1/books/${id}`).send(book);

            expect(bookRepository.update).toHaveBeenCalledWith(book, { where: { id }, returning: true, individualHooks: true });
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('success');
            expect(response.body.success).toEqual(true);
            expect(response.body.data).toEqual(book);
        })
    })
})