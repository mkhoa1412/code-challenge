import { Cradle } from '@/container';
import { BookService } from './bookService';

export const getServices = (deps: Cradle) => {
    return {
        bookService: new BookService(deps),
    }
}