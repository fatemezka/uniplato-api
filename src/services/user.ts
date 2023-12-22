import prisma from "../database/prisma";

export const create = async (
  name: string,
  family: string,
  username: string,
  email: string,
  password: string
) => {
  try {
    return await prisma.user.create({
      data: { name, family, username, email, password },
      select: {
        id: true,
        name: true,
        family: true,
        username: true,
        email: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getByUsername = async (username: string) => {
  return await prisma.user.findUnique({ where: { username } });
};
