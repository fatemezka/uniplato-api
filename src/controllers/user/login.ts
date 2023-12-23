import { JSONSchemaType } from "ajv";
import bcrypt from "bcrypt";
import { FastifyRequest, FastifyReply } from "fastify";
import { getByEmail } from "../../services/user";
import { server } from "../../index";

// schema
interface BodyData {
  email: string;
  password: string;
}

export const bodySchema: JSONSchemaType<BodyData> = {
  type: "object",
  properties: {
    email: { type: "string" }, // todo email validation
    password: { type: "string" },
  },
  required: ["email", "password"],
};

// handler
export const handler = async (
  req: FastifyRequest<{ Body: BodyData }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = req.body;

    // ensure that email exists
    const user = await getByEmail(email);

    if (!user) {
      return reply.code(401).send("User by this email does not exist.");
    }

    // check password is correct
    const salt = process.env.BCRYPT_SALT ?? "";
    const hash_password = await bcrypt.hash(password, salt);
    if (user.password !== hash_password)
      return reply.code(403).send("Password is incorrect.");

    // create access token
    let access_token = (server as any).jwt.sign({
      user_id: user.id,
      username: user.username,
      email: user.email,
    });

    return reply.code(200).send({ access_token });
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
};
