import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { UserEntity } from "./entities/user";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PW || "",
  database: process.env.DATABASE_DB || "code-challenge",
  entities: [UserEntity],
  synchronize: true,
});
