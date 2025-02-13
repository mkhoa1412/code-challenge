import { Cradle } from '@/container';
import { BookController } from './bookController';

export const getControllers = (deps: Cradle) => {
    return {
        bookController: new BookController(deps),
    }
}