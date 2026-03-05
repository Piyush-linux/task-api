import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: `
   A simple REST API for managing tasks.

   Features:
   - User authentication (JWT)
   - CRUD operations for tasks
   - Pagination
   - Input validation
   - Standardized error handling

   Built with: Node.js, Express, PostgreSQL
   `,
      tags: [
        { name: "Auth", description: "User authentication" },
        { name: "Tasks", description: "Task management operations" },
      ],
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
