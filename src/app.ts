import { FastifyListenOptions } from "fastify";
import logger from "./logger";
import { createServer } from "./server";

// dotenv
import dotenv from "dotenv";
dotenv.config();

export const server = createServer();
const startServer = async () => {
  const port: number = parseInt(<string>process.env.SERVER_PORT, 10) || 3000;

  // run server
  try {
    let server_options: FastifyListenOptions = { port };
    await server.listen(server_options);
    logger.info(`Server is ready on port: ${port}`);
  } catch (error) {
    logger.error((error as Error).message);
    process.exit(1);
  }
};

startServer();
