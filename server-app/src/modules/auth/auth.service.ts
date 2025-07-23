import prisma from '../../config/prisma.js'
import type { Prisma, Token } from '@prisma/client'

export type TokenWhereUniqueInput = Prisma.TokenWhereUniqueInput
export type TokenUncheckedCreateInput = Prisma.TokenUncheckedCreateInput

const findToken = async (
  filter: TokenWhereUniqueInput
): Promise<Token | null> => {
  return await prisma.token.findUnique({
    where: filter,
  })
}

const updateOrCreateToken = async (
  filter: TokenWhereUniqueInput,
  payload: TokenUncheckedCreateInput
): Promise<Token> => {
  return await prisma.token.upsert({
    where: filter,
    update: payload,
    create: payload,
  })
}

const deleteToken = async (
  filter: TokenWhereUniqueInput
): Promise<Token | null> => {
  return await prisma.token.delete({
    where: filter,
  })
}

export default {
  findToken,
  updateOrCreateToken,
  deleteToken,
}
