import { getV1Router } from './http/v1';
import { healthRouter } from './http/healthRouter';
import { getDocRouter } from './http/doc';
import { Cradle } from '@/container';

export const getRouters = (deps: Cradle) => {
    return {
        getDocRouter,
        getV1Router,
        healthRouter,
    }
}