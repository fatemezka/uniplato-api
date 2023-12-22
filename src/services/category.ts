import prisma from "../database/prisma";

const category_selects = { id: true, title: true, score: true };

export const getById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
    select: category_selects,
  });
};

export const getAll = async () => {
  return await prisma.category.findMany({
    select: category_selects,
  });
};

export const updateScore = async (id: string, score: number) => {
  return await prisma.category.update({
    where: { id },
    data: { score },
    select: category_selects,
  });
};

export const increaseScore = async (id: string) => {
  return await prisma.category.update({
    where: { id },
    data: { score: { increment: 1 } },
    select: category_selects,
  });
};

export const decreaseScore = async (id: string) => {
  return await prisma.category.update({
    where: { id },
    data: { score: { decrement: 1 } },
    select: category_selects,
  });
};
