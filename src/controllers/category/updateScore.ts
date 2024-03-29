import { JSONSchemaType } from "ajv";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  increaseScore,
  decreaseScore,
  updateScore,
  getById,
} from "../../services/category";
import logger from "../../logger";

// schema
interface ParamsData {
  id: string;
}
enum OperationType {
  Increase = "increase",
  Decrease = "decrease",
}
interface BodyData {
  score: number;
  operation: OperationType;
}

export const paramsSchema: JSONSchemaType<ParamsData> = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

export const bodySchema: JSONSchemaType<BodyData> = {
  type: "object",
  properties: {
    score: { type: "integer" },
    operation: { type: "string", enum: Object.values(OperationType) },
  },
  required: [],
};

// handler
export const handler: any = async (
  req: FastifyRequest<{ Params: ParamsData; Body: BodyData }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const { score, operation } = req.body;

  try {
    let category = await getById(id);
    if (!category) {
      return reply.code(401).send("Category not found.");
    }

    // update category's score
    if (score || score == 0) {
      category = await updateScore(id, score);
    } else if (operation == "increase") {
      category = await increaseScore(id);
    } else if (operation == "decrease") {
      category = await decreaseScore(id);
    }

    return reply.code(200).send(category);
  } catch (error) {
    logger.error((error as Error).message);
    return reply.code(500).send(error);
  }
};
