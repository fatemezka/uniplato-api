import { FastifyInstance } from "fastify";
import * as getAllController from "../controllers/category/getAll";
import * as getByIdController from "../controllers/category/getById";

export const categoryRoutes = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  // get all
  server.get("/all", getAllController.handler);

  // get by id
  server.get(
    "/:id",
    {
      schema: {
        params: getByIdController.paramsSchema,
      },
    },
    getByIdController.handler
  );

  done();
};
