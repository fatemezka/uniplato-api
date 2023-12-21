import { FastifyInstance } from "fastify";
import * as registerController from "../controllers/user/register";

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

  done();
};
