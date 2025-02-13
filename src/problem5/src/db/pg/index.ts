import { QueryOptions } from 'sequelize';
import { Sequelize as _Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { env } from '@/config';
import { getChildLogger, Logger } from '@/common/logger';

const logger = getChildLogger('sequelize:pg');

const defaultConfigs = {
    dialect: 'postgres',
    logging: logger[env.POSTGRES_LOG_LEVEL].bind(logger),
    pool: {
        max: env.POSTGRES_POOL_MAX,
        min: env.POSTGRES_POOL_MIN,
        acquire: env.POSTGRES_POOL_ACQUIRE,
        idle: env.POSTGRES_POOL_IDLE,
    },
    dialectOptions: {
        application_name: `application_name: ${env.NODE_ENV}: t99`,
    },
}

export class Sequelize extends _Sequelize {
    _authenticated: boolean
    logger: Logger

    constructor(deps, options: Partial<SequelizeOptions>) {
        // super(...params);
        super({
            ...defaultConfigs,
            ...options,
            repositoryMode: true,
        } as any);
        this.logger = deps.logger;
        this._authenticated = false;
    }

    async authenticate(options?: QueryOptions): Promise<void> {
        if (this._authenticated) {
            return;
        }

        await super.authenticate(options);
        this.logger.info(`Sequelize has been established successfully.`);
        this._authenticated = true;
    }

    async init(...params: Parameters<Sequelize['authenticate']>) {
        await this.authenticate(...params);
    }
}
