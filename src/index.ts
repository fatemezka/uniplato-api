import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "fastify-jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { userRoutes } from "./routes/user";
import { categoryRoutes } from "./routes/category";

// dotenv
import dotenv from "dotenv";
dotenv.config();

export const server = Fastify();

// jwt
server.register(fastifyJwt, { secret: process.env.JWT_SECRET });

async function main() {
  const port = process.env.SERVER_PORT ?? 3000;

  // swagger
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Uniplato Swagger API",
        description: "Testing the Uniplato project APIs.",
      },
      schemes: ["http"],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey", // todo change
          in: "header",
        },
      },
    },
  });

  await server.register(fastifySwaggerUI, {
    routePrefix: "/docs",
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

  try {
    await server.listen(port);
    console.log(`Server is on port: ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
