import { FastifyInstance } from "fastify";
import * as registerController from "../controllers/user/register";
import * as loginController from "../controllers/user/login";

export const userRoutes = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  // register
  server.post(
    "/register",
    {
      schema: {
        description: "Register new user.",
        tags: ["User"],
        summary: "Register new user",
        body: registerController.bodySchema,
      },
    },
    registerController.handler
  );

  // login
  server.post(
    "/login",
    {
      schema: {
        description: "Login user.",
        tags: ["User"],
        summary: "Login user",
        body: loginController.bodySchema,
      },
    },
    loginController.handler
  );

  done();
};
