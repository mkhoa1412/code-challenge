import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/database';

export class Resource extends Model {}
Resource.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: 'Resource',
    }
);
