import { FastifyInstance } from "fastify";
import * as getAllController from "../controllers/category/getAll";
import * as getByIdController from "../controllers/category/getById";
import * as updateScoreController from "../controllers/category/updateScore";

export const categoryRoutes = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  // get all
  server.get(
    "/all",
    {
      schema: {
        description: "Get all categories.",
        tags: ["Category"],
        summary: "Get all categories",
      },
    },
    getAllController.handler
  );

  // get by id
  server.get(
    "/:id",
    {
      schema: {
        description: "Get a category by id.",
        tags: ["Category"],
        summary: "Get a category by id",
        params: getByIdController.paramsSchema,
      },
    },
    getByIdController.handler
  );

  // update score
  server.put(
    "/:id",
    {
      schema: {
        description: "Update category's score by id.",
        tags: ["Category"],
        summary: "Update category's score by id",
        params: updateScoreController.paramsSchema,
        body: updateScoreController.bodySchema,
      },
    },
    updateScoreController.handler
  );

  done();
};
