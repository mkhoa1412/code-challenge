import supertest from 'supertest';
import { Cradle } from '@/container';
import { getV1Router } from '@/router/http/v1';
import { Sequelize } from '@/db/pg';
import { getModels } from '@/db/pg/models';
import { getControllers } from '@/controller';
import { getServices } from '@/service';
import { getRepo } from '@/repository';
import { createTypedContainer, TypedAwilixContainer } from '@/container/container.utils';
import { asFunction, asValue, InjectionMode } from 'awilix';
import { Logger, logger } from '@/common/logger';
import { getExpressApp, getServer } from '@/server';
import { getRouters } from '@/router';

import { getMockBookRepository } from '../testHelpers/repositoryHelper';

export const getMockContainer = () => {
    const mockRepository = {
        bookRepository: getMockBookRepository(),
    };

    const mockDb = {
        query: jest.fn(),
        define: jest.fn(),
        getRepository: jest.fn().mockReturnValue(mockRepository),
    } as unknown as Sequelize;
    const mockModels = getModels(mockDb);

    const container = createTypedContainer({
        logger: asValue(logger),
        db: asValue(mockDb),
        models: asValue(mockModels),
        express: asFunction(getExpressApp).singleton(),
        services: asFunction(getServices).singleton(),
        controllers: asFunction(getControllers).singleton(),
        router: asFunction(getRouters).singleton(),
        repository: asFunction(() => mockRepository).singleton(),
    }, {
        injectionMode: InjectionMode.PROXY,
        strict: true,
    });
    return container;
}

export const getMockApp = (deps: Cradle) => {
    return supertest(deps.express);
}

export const getCommonHeaders = () => {
    return {
        'Content-Type': 'application/json',
    }
}