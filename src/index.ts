import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { userRoutes } from "./routes/user";
import { categoryRoutes } from "./routes/category";
import logger from "./logger";

// dotenv
import dotenv from "dotenv";
dotenv.config();

const server = Fastify();

async function main() {
  const port = process.env.SERVER_PORT ?? 3000;

  // jwt
  await server.register<any>(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });

  // swagger
  await server.register<any>(fastifySwagger, {
    swagger: {
      info: {
        title: "Uniplato Swagger API",
        description: "Testing the Uniplato project APIs.",
      },
      schemes: ["http"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "x-uniplato-auth",
          in: "header",
        },
      },
    },
  });

  await server.register(fastifySwaggerUI, {
    routePrefix: "/",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // routes
  server.register(userRoutes, { prefix: "/user" });
  server.register(categoryRoutes, { prefix: "/category" });

  // run server
  try {
    await server.listen(port);
    logger.info(`Server is ready on port: ${port} :)`);
  } catch (error) {
    logger.error((error as Error).message);
    process.exit(1);
  }
}

export { server };

main();
