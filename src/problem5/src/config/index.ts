// import "reflect-metadata";
import dotenv from "dotenv";
import * as nvalid from "envalid";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'dev',
    choices: ["dev", "prod", "test"]
  }),
  CORS_ORIGIN: str({
    default: 'localhost:8421',
  }),

  REST_HOST: host({
    default: 'localhost',
  }),
  REST_PORT: port({
    default: 8421,
  }),
  LOG_LEVEL: str({
    default: 'info',
  }),

  POSTGRES_LOG_LEVEL: str({
    default: 'debug',
    choices: ["error", "warn", "info", "debug", "trace"],
  }),
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DB: str(),
  POSTGRES_PORT: port(),
  POSTGRES_HOST: str(),

  POSTGRES_POOL_MAX: num({ default: 5 }),
  POSTGRES_POOL_MIN: num({ default: 1 }),
  POSTGRES_POOL_ACQUIRE: num({ default: 30000 }),
  POSTGRES_POOL_IDLE: num({ default: 10000 }),
});
