import { Logger, logger } from '@/common/logger';

import { env } from '@/config';
import { createTypedContainer } from './container.utils';
import { Server } from 'http';

import {
    asFunction,
    asValue,
    InjectionMode,
} from 'awilix';

import { Sequelize } from '@/db/pg';
import { getExpressApp, getServer } from '@/server';
import { getModels } from '@/db/pg/models'
import { getRepo } from '@/repository';
import { getServices } from '@/service';
import { getControllers } from '@/controller';


import {
    getRouters
} from '@/router';

export type Cradle = {
    db: Sequelize,
    logger: Logger,
    express: ReturnType<typeof getExpressApp>,
    server: Server,
    models: ReturnType<typeof getModels>
    repository: ReturnType<typeof getRepo>
    router: ReturnType<typeof getRouters>,
    services: ReturnType<typeof getServices>,
    controllers: ReturnType<typeof getControllers>
}

const container = createTypedContainer({
    logger: asValue(logger),

    db: asFunction((c) => {
        const db = new Sequelize(c, {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            database: env.POSTGRES_DB,
            username: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
        });

        const modelMap = c.models;
        db.addModels(Object.values(modelMap));

        return db;
    }).singleton().disposer(async (s) => {
        logger.info('Pg closing');
        await s.close();
    }),

    services: asFunction(getServices).singleton(),
    controllers: asFunction(getControllers).singleton(),

    router: asFunction(getRouters).singleton(),
    
    repository: asFunction(getRepo).singleton(),
    models: asFunction(getModels).singleton(),

    express: asFunction(getExpressApp).singleton(),

    server: asFunction((c) => {
        const s = getServer(c);
        return s;
    }).singleton().disposer((server) => {
        server.close((err) => {
            if(err) {
                logger.warn('Server unable to close: ' + err.message);
            } else {
                logger.info('Server closed');
            }
        });
    }),
}, {
    injectionMode: InjectionMode.PROXY,
    strict: true,
});

export default container;