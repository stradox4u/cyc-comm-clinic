import type { Patient, Prisma } from '@prisma/client'
import prisma from '../../config/prisma.js'

export type PatientWhereUniqueInput = Prisma.PatientWhereUniqueInput
export type PatientCreateInput = Prisma.PatientCreateInput
export type PatientUpdateInput = Prisma.PatientUpdateInput

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

export default {
  findPatient,
  createPatient,
  updatePatient,
}
