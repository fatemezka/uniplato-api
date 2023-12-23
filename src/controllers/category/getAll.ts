import { FastifyRequest, FastifyReply } from "fastify";
import { getAll } from "../../services/category";
import logger from "../../logger";

// handler
export const handler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const categories = await getAll();

    return reply.code(200).send(categories);
  } catch (error) {
    logger.error((error as Error).message);
    return reply.code(500).send(error);
  }
};
