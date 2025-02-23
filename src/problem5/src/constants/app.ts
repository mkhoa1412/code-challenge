import { AppEnviroment } from "~/enums/app";
import { env, forceenv } from "~/utils/env";

export const APP_ENVIROMENT = env("ENV", AppEnviroment.Local);
export const PREFIX_ROUTER_API = env("PREFIX_ROUTER_API", "/api/v1");
export const PREFIX_ROUTER_WEB = "/";
export const DB_URL = forceenv("DB_URL");
export const SERVE_PORT = env("SERVE_PORT", 3000);
export const APP_JWT_SECRET = forceenv("APP_JWT_SECRET");
