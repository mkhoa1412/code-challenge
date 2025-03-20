import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()


export const AppDataSource = new DataSource({
    type:  process.env.TYPE as "postgres",
    host: process.env.host,
    port: Number(process.env.DB_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: true,
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
})