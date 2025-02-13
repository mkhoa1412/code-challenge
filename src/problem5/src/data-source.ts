import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [User],
  synchronize: true,
  logging: false,
});
