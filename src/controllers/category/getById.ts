import { JSONSchemaType } from "ajv";
import { FastifyRequest, FastifyReply } from "fastify";
import { getById } from "../../services/category";

// schema
interface Data {
  id: string;
}

export const paramsSchema: JSONSchemaType<Data> = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

// handler
export const handler = async (
  req: FastifyRequest<{ Params: Data }>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  try {
    const category = await getById(id);

    return reply.code(200).send(category);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
};
