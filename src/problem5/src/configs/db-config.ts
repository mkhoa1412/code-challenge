import * as dotenv from 'dotenv';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { TodoList } from '../entities';

dotenv.config();

interface DbConfig {
  sqlite: SqliteConnectionOptions
  // ...
}

export const dbConfig: DbConfig = {
  sqlite: {
    type: 'sqlite',
    database: process.env?.DB_FILE || 'db.sqlite',
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
    entities: [`${__dirname}/../entities/*.{ts,js}`],
    logging: true,
    ...(process.env.NODE_ENV === 'production'
      ? // prodConfig
        {
          synchronize: false,
          logging: false,
        }
      : // devConfig
        {
          synchronize: true,
          logging: true,
        }),
  },
};
