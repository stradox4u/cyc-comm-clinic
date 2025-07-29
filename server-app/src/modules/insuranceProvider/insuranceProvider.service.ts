import prisma from '../../config/prisma.js'
import type { Prisma, InsuranceProvider } from '@prisma/client'

export type InsuranceProviderFindManyArgs = Prisma.InsuranceProviderFindManyArgs
export type InsuranceProviderWhereInput = Prisma.InsuranceProviderWhereInput
export type InsuranceProviderWhereUniqueInput =
  Prisma.InsuranceProviderWhereUniqueInput
export type InsuranceProviderCreateInput = Prisma.InsuranceProviderCreateInput
export type InsuranceProviderUncheckedCreateInput =
  Prisma.InsuranceProviderUncheckedCreateInput
export type InsuranceProviderUncheckedUpdateInput =
  Prisma.InsuranceProviderUncheckedUpdateInput

const findInsuranceProviders = async (
  filter?: InsuranceProviderWhereInput,
  options?: InsuranceProviderFindManyArgs & {
    page?: number
    limit?: number
  }
): Promise<InsuranceProvider[]> => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.insuranceProvider.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
  })
}

const findInsuranceProvider = async (
  filter: InsuranceProviderWhereUniqueInput
): Promise<InsuranceProvider | null> => {
  return await prisma.insuranceProvider.findUnique({
    where: filter,
  })
}

const createInsuranceProvider = async (
  payload: InsuranceProviderUncheckedCreateInput
): Promise<InsuranceProvider> => {
  return await prisma.insuranceProvider.create({
    data: payload,
  })
}

const updateInsuranceProvider = async (
  filter: InsuranceProviderWhereUniqueInput,
  payload: InsuranceProviderUncheckedUpdateInput
): Promise<InsuranceProvider> => {
  return await prisma.insuranceProvider.update({
    where: filter,
    data: payload,
  })
}

const deleteInsuranceProvider = async (
  filter: InsuranceProviderWhereUniqueInput
): Promise<InsuranceProvider | null> => {
  return await prisma.insuranceProvider.delete({
    where: filter,
  })
}

export default {
  findInsuranceProviders,
  findInsuranceProvider,
  createInsuranceProvider,
  updateInsuranceProvider,
  deleteInsuranceProvider,
}
