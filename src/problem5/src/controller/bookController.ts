import { Cradle } from '@/container';
import { BaseController } from './baseController';
import { type Response } from 'express';
import { RestResponse, handleRes, asyncHandler } from '@/helpers';
import { StatusCodes } from 'http-status-codes';
import { BOOK_ERROR } from '@/const/book.const';

export class BookController extends BaseController {
    bookService: Cradle['services']['bookService'];

    constructor(deps: Cradle) {
        super(deps, {
            ns: 'controller:book',
        });

        this.bookService = deps.services.bookService;
    }

    getById = asyncHandler(async (req, res: Response) => {
        const id = req.params.id;
        const book = await this.bookService.getById(id, {
            raw: true,
        });

        if(!book)  {
            handleRes(RestResponse.failure(null, {
                message: BOOK_ERROR.NOT_FOUND,
                status: StatusCodes.NOT_FOUND,
            }), res);

            return;
        }
        handleRes(RestResponse.success(book), res);
    })

    getBooks = asyncHandler(async (req, res: Response) => {
        const q = req.query;
        const { limit, offset, ...restQuery } = q;
        const allBooks = await this.bookService.getAll({
            limit, offset, where: restQuery,
            raw: true,
        });
        handleRes(RestResponse.success(allBooks), res);
    })

    createBook = asyncHandler(async (req, res: Response) => {
        const body = req.body;
        const createdRes = await this.bookService.create(body, {
            returning: true,
        });

        handleRes(RestResponse.success(createdRes, {
            status: StatusCodes.CREATED,
        }), res);
    })

    updatePutBook = asyncHandler(async (req, res: Response) => {
        const body = req.body;
        const { id } = req.params;
        const updatedRes = await this.bookService.updateReturnById(id, body);

        const [affectedCount, data] = updatedRes;
        if(!affectedCount || !data.length) {
            handleRes(RestResponse.failure(null, {
                message: 'No book found',
                status: StatusCodes.NOT_FOUND,
            }), res);
            return;
        }
        handleRes(RestResponse.success(data[0]), res);
    })

    updatePatchBook = asyncHandler(async (req, res: Response) => {
        const body = req.body;
        const { id } = req.params;

        const updatedRes = await this.bookService.updateReturnById(id, body, {
            individualHooks: true,
        });
        const [affectedCount, data] = updatedRes;
        if(!affectedCount || !data.length) {
            handleRes(RestResponse.failure(null, {
                message: 'No book found',
                status: StatusCodes.NOT_FOUND,
            }), res);
            return;
        }
        handleRes(RestResponse.success(data[0]), res);
    })

    deleteById = asyncHandler(async (req, res: Response) => {
        const { id } = req.params;
        const deletedRes = await this.bookService.deleteById(id);
        if(deletedRes > 0) {
            handleRes(RestResponse.success(deletedRes), res);
        } else {
            handleRes(RestResponse.failure(deletedRes, {
                message: BOOK_ERROR.NOT_FOUND,
                status: StatusCodes.NOT_FOUND,
            }), res);
        }
    })
}