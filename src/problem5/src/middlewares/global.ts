import express from "express";

const global = (request: express.Request, response: express.Response, next: express.NextFunction) => {
	request.fullHostUrl = `${request.protocol}://${request.get("host")}`;
	return next();
};

export default global;
