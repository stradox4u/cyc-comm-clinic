import type { Vitals, Prisma } from '@prisma/client';
import type { VitalsRecord } from '../vitals/vitals.validation.js';

export type VitalsCreateInput = Prisma.VitalsCreateInput
export type VitalsWhereUniqueInput = Prisma.VitalsWhereUniqueInput
export type VitalsWhereInput = Prisma.VitalsWhereInput
export type VitalsUpdateInput = Prisma.VitalsUpdateInput

// for nested vitals in appointment create
function buildVitals(
  payload?: VitalsRecord
): { create: Omit<VitalsRecord, 'appointment'> } | undefined {
  if (!payload) return undefined;

  const rest = payload;

  return {
    create: rest,
  };
}


export default {
    buildVitals
}
