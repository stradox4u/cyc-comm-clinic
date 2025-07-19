import type { Provider, Prisma } from '@prisma/client'
import prisma from '../../config/prisma.js'

export type ProviderWhereUniqueInput = Prisma.ProviderWhereUniqueInput
export type ProviderCreateInput = Prisma.ProviderCreateInput
export type ProviderUpdateInput = Prisma.ProviderUpdateInput

const findProvider = async (
  filter: ProviderWhereUniqueInput
): Promise<Provider | null> => {
  return await prisma.provider.findUnique({
    where: filter,
  })
}

const createProvider = async (
  payload: ProviderCreateInput
): Promise<Provider> => {
  return await prisma.provider.create({
    data: payload,
  })
}

const updateProvider = async (
  filter: ProviderWhereUniqueInput,
  payload: ProviderUpdateInput
): Promise<Provider | null> => {
  return await prisma.provider.update({
    where: filter,
    data: payload,
  })
}

export default {
  findProvider,
  createProvider,
  updateProvider,
}
