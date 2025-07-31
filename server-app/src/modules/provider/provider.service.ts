import type { Provider, Prisma } from '@prisma/client'
import prisma from '../../config/prisma.js'

export type ProviderWhereInput = Prisma.ProviderWhereInput
export type ProviderFindManyArgs = Prisma.ProviderFindManyArgs
export type ProviderWhereUniqueInput = Prisma.ProviderWhereUniqueInput
export type ProviderUncheckedCreateInput = Prisma.ProviderUncheckedCreateInput
export type ProviderUpdateInput = Prisma.ProviderUpdateInput

const findProviders = async (
  filter?: ProviderWhereInput,
  options?: ProviderFindManyArgs & {
    page?: number
    limit?: number
  }
): Promise<Omit<Provider, 'password'>[]> => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.provider.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
    omit: { password: true },
  })
}

const findProvider = async (
  filter: ProviderWhereUniqueInput
): Promise<Provider | null> => {
  return await prisma.provider.findUnique({
    where: filter,
  })
}

const createProvider = async (
  payload: ProviderUncheckedCreateInput
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

const deleteProvider = async (
  filter: ProviderWhereUniqueInput
): Promise<Provider | null> => {
  return await prisma.provider.delete({
    where: filter,
  })
}

export default {
  findProviders,
  findProvider,
  createProvider,
  updateProvider,
  deleteProvider,
}
