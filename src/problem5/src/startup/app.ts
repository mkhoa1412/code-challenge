import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { boot } from "~/startup/bootstrap";
import global from "~/middlewares/global";
import web from "~/middlewares/web";
import webRouter from "~/routes/web";
import apiRouter from "~/routes/api";
import { PREFIX_ROUTER_API, PREFIX_ROUTER_WEB, SERVE_PORT } from "~/constants/app";
import multiparty from "~/app/middlewares/multiparty";

(async () => {
	await boot();

	const port = SERVE_PORT;

	const app = express();

	app.use(helmet());
	app.set("trust proxy", true);

	app.use(cors());
	app.use(morgan("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(multiparty);
	app.use(express.static(path.join(process.cwd(), "storage", "public")));
	app.use(global);

	app.use(PREFIX_ROUTER_WEB, webRouter);
	app.use(PREFIX_ROUTER_API, apiRouter);

	app.use(web);

	app.listen(port, () => {
		console.info(`[server]: Server is running at port: http://${path.join(`localhost:${port}`, PREFIX_ROUTER_API)}`);
	});
})();
