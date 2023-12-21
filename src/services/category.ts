import prisma from "../database/prisma";

export const getAll = async () => {
  return await prisma.category.findMany({
    select: { id: true, title: true, score: true },
  });
};
