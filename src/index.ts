import Fastify from "fastify";
import fastifyJwt from "fastify-jwt";
import { userRoutes } from "./routes/user";
import { categoryRoutes } from "./routes/category";

// dotenv
import dotenv from "dotenv";
dotenv.config();

export const server = Fastify();

server.register(fastifyJwt, { secret: process.env.JWT_SECRET });

async function main() {
  const port = process.env.SERVER_PORT ?? 3000;

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
