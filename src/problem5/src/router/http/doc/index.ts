import express, { type Request, type Response, type Router } from "express";
import swaggerUi from "swagger-ui-express";

import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { getBookOpenAPI } from '@/router/http/v1/bookRouter';
import { getHealthOpenAPI } from '@/router/http/healthRouter';
import { Cradle } from "@/container";

export function generateOpenAPI() {
  const registry = new OpenAPIRegistry([
    getHealthOpenAPI(),
    getBookOpenAPI(),
]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/doc/swagger.json",
    },
  });
}

export const getDocRouter = (deps: Cradle) => {
    const router: Router = express.Router();
    const openAPIDocument = generateOpenAPI();
    
    router.get("/swagger.json", (_req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(openAPIDocument);
    });
    
    router.use("/", swaggerUi.serve, swaggerUi.setup(openAPIDocument));
    return router;
}
