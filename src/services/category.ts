import prisma from "../database/prisma";

export const getById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    select: { id: true, title: true, score: true },
  });
};

export const getAll = async () => {
  return await prisma.category.findMany({
    select: { id: true, title: true, score: true },
  });
};
