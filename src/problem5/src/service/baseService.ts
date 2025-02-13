import { Cradle } from '@/container';
import { BaseModel } from '@/db/pg/models/baseModel';
import { CreateOptions, CreationAttributes, FindAndCountOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Repository } from 'sequelize-typescript';

export class BaseService<T extends BaseModel> {
    repository: Repository<T>
    
    constructor(deps: Cradle, repository: Repository<T>) {
        this.repository = repository;
    }

    getAll = async (opts: FindAndCountOptions = {}) => {
        return await this.repository.findAndCountAll<T>(opts);
    }

    getById = async(id: string, opts: FindOptions = {}) => {
        const bookGot = await this.repository.findByPk(id, opts);
        return bookGot;
    }

    create = async(payload: CreationAttributes<T>, opts: CreateOptions = {}) => {
        return await this.repository.create(payload, opts);
    }

    deleteById = async(id: string) => {
        return await this.repository.destroy<BaseModel>({
            where: { id }
        });
    }

    updateReturnById = async(id: string, payload: Partial<T>, opts: Omit<UpdateOptions<BaseModel>, 'where' | 'returning'> = {}) => {
        return await this.updateById(id, payload, { ...opts, returning: true }) as unknown as [affectedCount: number, affectedRows: T[]];
    }

    updateById = async(id: string, payload: Partial<T>, opts: Omit<UpdateOptions<BaseModel>, 'where'>) => {
        return await this.repository.update<BaseModel>(payload, {
            ...opts,
            where: { id },
        });
    }
}
