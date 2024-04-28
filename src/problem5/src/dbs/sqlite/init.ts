import "reflect-metadata"
import { DataSource } from "typeorm"
import { dbConfig } from "../../configs"

export const AppDataSource = new DataSource(dbConfig.sqlite)
export const initSQLite = async () => {
    await AppDataSource.initialize().then(() => {
        console.log("SQLite database has been initialized!")
    }).catch((err) => {
        console.error("Error during SQLite database initialization", err)
    })
}