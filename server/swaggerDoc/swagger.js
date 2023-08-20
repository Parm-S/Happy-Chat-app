import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Happ-chat-server",
      version: "1.0.0",
      description: "API documentation for happy chat",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your server URL
      },
    ],
  },
  // Path to the API routes files
  apis: ["./modules/**/*.js"], // Glob pattern for all route files in modules
};

const specs = swaggerJsdoc(options);

export default specs;

// Create a Swagger UI middleware
export const swaggerUiMiddleware = swaggerUi.setup(specs);
