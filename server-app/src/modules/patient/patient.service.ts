import type { Patient, Prisma } from '@prisma/client'
import prisma from '../../config/prisma.js'

export type PatientWhereInput = Prisma.PatientWhereInput
export type PatientFindManyArgs = Prisma.PatientFindManyArgs
export type PatientWhereUniqueInput = Prisma.PatientWhereUniqueInput
export type PatientCreateInput = Prisma.PatientCreateInput
export type PatientUpdateInput = Prisma.PatientUpdateInput

const findPatients = async (
  filter?: PatientWhereInput,
  options?: PatientFindManyArgs & {
    page?: number
    limit?: number
  }
): Promise<Omit<Patient, 'password'>[]> => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.patient.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
    omit: { password: true },
  })
}

const findPatient = async (
  filter: PatientWhereUniqueInput
): Promise<Patient | null> => {
  return await prisma.patient.findUnique({
    where: filter,
  })
}

const createPatient = async (payload: PatientCreateInput): Promise<Patient> => {
  return await prisma.patient.create({
    data: payload,
  })
}

const updatePatient = async (
  filter: PatientWhereUniqueInput,
  payload: PatientUpdateInput
): Promise<Patient | null> => {
  return await prisma.patient.update({
    where: filter,
    data: payload,
  })
}

const deletePatient = async (
  filter: PatientWhereUniqueInput
): Promise<Patient | null> => {
  return await prisma.patient.delete({
    where: filter,
  })
}

export default {
  findPatients,
  findPatient,
  createPatient,
  updatePatient,
  deletePatient,
}
