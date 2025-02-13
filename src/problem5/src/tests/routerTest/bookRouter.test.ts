import supertest from 'supertest';
import { Cradle } from '@/container';
import { TypedAwilixContainer } from '@/container/container.utils';
import { getMockContainer, getMockApp } from '../testHelpers/serverHelper';
import { RestResponse } from '@/helpers';
import { BookAttributes } from '@/db/pg/models/bookModel';

describe('GET /v1/books/:id', () => {
    let app: supertest;
    let container: TypedAwilixContainer<any>;

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
    })

    it('should return a 404: Non existed id', async () => {
        const id = '36147659-baf0-4dd5-b45d-bae7b92f2047';
        const mockFindByPk = jest.fn().mockResolvedValue(null);
        (container.cradle as Cradle).repository.bookRepository.findByPk = mockFindByPk;

        const response = await app.get(`/v1/books/${id}`);

        expect(mockFindByPk).toHaveBeenCalledWith(id);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            success: false,
            data: null,
            message: 'Book not found',
        });
    });

    it('should return a 422: Invalid id', async () => {
        const id = 'id';
        // (container.cradle as Cradle).repository.bookRepository.findByPk = jest.fn().mockResolvedValue(null);

        const response = await app.get(`/v1/books/${id}`);

        expect(response.status).toBe(422);
        expect(response.body.message).toMatch('Invalid input: ');
    });

    it('should return a 200', async () => {
        const id = '36147659-baf0-4dd5-b45d-55f2a878e638';
        const mockFindByPk = jest.fn().mockResolvedValue(mockBooks[0]);
        (container.cradle as Cradle).repository.bookRepository.findByPk = mockFindByPk;

        const response: {
            status: number,
            body: RestResponse<BookAttributes>
        } = await app.get(`/v1/books/${id}`).query({ id });

        console.log(',,,response.body', response.body);

        expect(mockFindByPk).toHaveBeenCalledWith(id);
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('success');
        expect(response.body.data).toEqual(mockBooks[0]);
        expect(response.body.success).toBe(true);
    });
});
