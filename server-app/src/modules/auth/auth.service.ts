import prisma from '../../config/prisma.js'
import type { Prisma, Patient, Provider } from '@prisma/client'

export type PatientWhereUniqueInput = Prisma.PatientWhereUniqueInput
export type PatientCreateInput = Prisma.PatientCreateInput
export type ProviderWhereUniqueInput = Prisma.ProviderWhereUniqueInput
export type ProviderCreateInput = Prisma.ProviderCreateInput

const findPatient = async (
  payload: PatientWhereUniqueInput
): Promise<Patient | null> => {
  return await prisma.patient.findUnique({
    where: payload,
  })
}

const createPatient = async (payload: PatientCreateInput): Promise<Patient> => {
  return await prisma.patient.create({
    data: payload,
  })
}

const findProvider = async (
  payload: ProviderWhereUniqueInput
): Promise<Provider | null> => {
  return await prisma.provider.findUnique({
    where: payload,
  })
}

const createProvider = async (
  payload: ProviderCreateInput
): Promise<Provider> => {
  return await prisma.provider.create({
    data: payload,
  })
}

export default {
  findPatient,
  createPatient,
  findProvider,
  createProvider,
}
