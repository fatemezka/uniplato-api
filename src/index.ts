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

// add optional user key to request
declare module "fastify" {
  interface FastifyRequest {
    user?: string;
  }
}

async function main() {
  const port = process.env.SERVER_PORT ?? 3000;

  // jwt
  await server.register(fastifyJwt, { secret: process.env.JWT_SECRET });

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

  try {
    await server.listen(port);
    console.log(`Server is on port: ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
