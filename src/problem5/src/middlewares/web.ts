import express from "express";

const web = (request: express.Request, response: express.Response) => {
	return response.status(403).send("Forbidden");
};

export default web;
