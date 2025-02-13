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
import { CreationOptional } from 'sequelize';

export class BaseModel extends Model<BaseModel, BaseModel> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4,
    })
    id: CreationOptional<string>;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    createdAt: CreationOptional<Date>;
  
    @UpdatedAt
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    updatedAt: CreationOptional<Date>;
  
    @DeletedAt
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    deletedAt: CreationOptional<Date>;  
}
