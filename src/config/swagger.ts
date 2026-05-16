import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "AI PDF Chat Backend API",
      version: "1.0.0",
      description: "AI-powered PDF Chat Backend using OpenAI and RAG",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);