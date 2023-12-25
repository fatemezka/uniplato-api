import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../app";

export const authenticate = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const access_token = req.headers["x-uniplato-auth"];

  if (!access_token) {
    return reply.code(403).send("No Token, Please Login first.");
  }

  try {
    const decoded_token = (server as any).jwt.decode(access_token);
    req.user = decoded_token;
  } catch (error) {
    return reply.code(403).send("Bad Token.");
  }
  done();
};
