import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { userRoutes } from "./routes/user";
import { categoryRoutes } from "./routes/category";

export const createServer = () => {
  const server = Fastify();

  // jwt
  server.register<any>(fastifyJwt, {
    secret: process.env.JWT_SECRET,
  });

  // swagger
  server.register<any>(fastifySwagger, {
    swagger: {
      info: {
        title: "Uniplato Swagger API",
        description: "Testing the Uniplato project APIs.",
      },
      schemes: ["http"],
    },
  });

  server.register(fastifySwaggerUI, {
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

  return server;
};
