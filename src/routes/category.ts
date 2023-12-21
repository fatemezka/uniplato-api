import { FastifyInstance } from "fastify";
import * as getAllController from "../controllers/category/getAll";

export const categoryRoutes = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  // get all
  server.get("/all", getAllController.handler);

  done();
};
