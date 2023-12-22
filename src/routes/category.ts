import { FastifyInstance } from "fastify";
import * as getAllController from "../controllers/category/getAll";
import * as getByIdController from "../controllers/category/getById";
import * as updateScoreController from "../controllers/category/updateScore";
import { authenticate } from "../middlewares/authenticate";

export const categoryRoutes = (
  server: FastifyInstance,
  options: any,
  done: () => void
) => {
  const header_schema = {
    type: "object",
    properties: {
      "x-uniplato-auth": { type: "string" },
    },
  };

  // get all
  server.get(
    "/all",
    {
      preHandler: authenticate,
      schema: {
        description: "Get all categories.",
        tags: ["Category"],
        summary: "Get all categories",
        headers: header_schema,
      },
    },
    getAllController.handler
  );

  // get by id
  server.get(
    "/:id",
    {
      preHandler: authenticate,
      schema: {
        description: "Get a category by id.",
        tags: ["Category"],
        summary: "Get a category by id",
        headers: header_schema,
        params: getByIdController.paramsSchema,
      },
    },
    getByIdController.handler
  );

  // update score
  server.put(
    "/:id",
    {
      preHandler: authenticate,
      schema: {
        description: "Update category's score by id.",
        tags: ["Category"],
        summary: "Update category's score by id",
        headers: header_schema,
        params: updateScoreController.paramsSchema,
        body: updateScoreController.bodySchema,
      },
    },
    updateScoreController.handler
  );

  done();
};
