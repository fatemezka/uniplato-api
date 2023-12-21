import { JSONSchemaType } from "ajv";
import bcrypt from "bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import { create, getByEmail } from "../../services/user";

// BodySchema
interface Data {
  name: string;
  family: string;
  username: string;
  email: string;
  password: string;
}
export const bodySchema: JSONSchemaType<Data> = {
  type: "object",
  properties: {
    name: { type: "string" },
    family: { type: "string" },
    username: { type: "string" },
    email: { type: "string" }, // todo email validation
    password: { type: "string" },
  },
  required: ["name", "family", "username", "email", "password"],
};

// Handler
export const handler = async (
  req: FastifyRequest<{ Body: Data }>,
  reply: FastifyReply
) => {
  try {
    const { name, family, username, email, password } = req.body;

    // check if email exists
    const existing_user = await getByEmail(email);
    if (existing_user) {
      return reply.code(401).send("This email does exist.");
    }

    // hash the plain password
    const hashed_password = await bcrypt.hash(
      password,
      process.env.BCRYPT_SALT ?? ""
    );

    // create user
    const user = await create(name, family, username, email, hashed_password);

    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
};
