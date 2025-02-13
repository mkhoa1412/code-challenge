import {
    CreationAttributes,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import {
    Table,
    Column,
    Model,
    HasMany,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
} from 'sequelize-typescript';

import { BaseModel } from './baseModel';

@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'books',

})
export class Book extends BaseModel {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    title: string;
    
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string | null;
    
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    author: string | null;
    
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    publisher: string | null;

}

export type BookAttributes = InferAttributes<Book>;
export type BookCreationAttributes = CreationAttributes<Book>;
