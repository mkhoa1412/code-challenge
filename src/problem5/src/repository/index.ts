import { Cradle } from '@/container';
import {
    Book
} from '@/db/pg/models';

export const getRepo = (deps: Cradle) => {
    return {
        bookRepository: deps.db.getRepository(Book)
    }
}
