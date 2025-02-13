import { Cradle } from '@/container';
import {
    getBookRouter,
} from './bookRouter';
import { Router, type Response, type Request } from 'express';

export const getV1Router = (deps: Cradle) => {
    const v1Router = Router();
    
    v1Router.use('/books', getBookRouter(deps));
    return v1Router;
}
