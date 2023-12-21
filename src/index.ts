import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();

export const server = Fastify();

async function main() {
  const port = process.env.SERVER_PORT ?? 3000;
  try {
    await server.listen(port);
    console.log(`Server is on port: ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
