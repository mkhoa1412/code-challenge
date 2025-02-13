import { Cradle } from '@/container';
import { Book } from '@/db/pg/models';
import { BaseService } from './baseService';

export class BookService extends BaseService<Book>{
    
    constructor(deps: Cradle) {
        super(deps, deps.repository.bookRepository);
    }
}