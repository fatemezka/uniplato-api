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
        body: loginController.bodySchema,
      },
    },
    loginController.handler
  );

  done();
};
