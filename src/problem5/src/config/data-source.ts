import "reflect-metadata";

import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { Scoreboard } from "../entities/scoreboard.entity";
import { User } from "../entities/user.entity";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,

  synchronize: NODE_ENV === "development" ? false : false,
  logging: NODE_ENV === "development" ? true : false,
  entities: [User, Scoreboard],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
});
