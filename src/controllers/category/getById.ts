import { JSONSchemaType } from "ajv";
import { FastifyRequest, FastifyReply, RouteHandlerMethod } from "fastify";
import { getById } from "../../services/category";
import logger from "../../logger";

// schema
interface ParamsData {
  id: string;
}

export const paramsSchema: JSONSchemaType<ParamsData> = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

// handler
export const handler: any = async (
  req: FastifyRequest<{ Params: ParamsData }>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  try {
    const category = await getById(id);

    return reply.code(200).send(category);
  } catch (error) {
    logger.error((error as Error).message);
    return reply.code(500).send(error);
  }
};
