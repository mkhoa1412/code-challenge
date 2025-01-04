import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express): void => {
  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Code challenge API",
        version: "1.0.0",
        description: "Code challenge API",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        schemas: {
          CreateUserReqDto: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Name of the user",
                example: "John Doe",
              },
              email: {
                type: "string",
                description: "Email of the user",
                example: "johndoe@example.com",
              },
            },
            required: ["name", "email"],
          },
          UpdateUserReqDto: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Updated name of the user",
                example: "John Updated",
              },
              email: {
                type: "string",
                description: "Updated email of the user",
                example: "johnupdated@example.com",
              },
            },
            required: ["name", "email"],
          },
          UserResponseDto: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "User ID",
                example: "1",
              },
              name: {
                type: "string",
                description: "Name of the user",
                example: "John Doe",
              },
              email: {
                type: "string",
                description: "Email of the user",
                example: "johndoe@example.com",
              },
            },
          },
        },
      },
    },
    apis: ["./src/routes/*.ts", "./src/dtos/**/*.ts"],
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
