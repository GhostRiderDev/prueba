export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "BancoIdeal API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  basePath: "/",
  apis: ["src/routes/*.js"],
};
