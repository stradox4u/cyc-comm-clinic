import type { Vitals, Prisma } from '@prisma/client';
import prisma from '../../config/prisma.js';
import type { VitalsRecord } from '../vitals/vitals.validation.js';

export type VitalsCreateInput = Prisma.VitalsCreateInput

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

async function recordVitals(
  payload: VitalsCreateInput
) : Promise<Vitals | null> {
  return prisma.vitals.create ({
    data: payload
  })
}

async function getVitalsByAppointmentId(appointmentId: string) {
  return prisma.vitals.findMany({
    where: {
      appointment_id: appointmentId
    },
    include: {
      appointment: true,
    }
  });
}

async function getVitalsByPatientId(patientId: string) {
  return prisma.vitals.findMany({
    where: {
      appointment: {
        patient_id: patientId,
      }
    },
    include: {
      appointment: true,
    }
  });
}

async function getVitalsByProviderId(providerId: string) {
  return prisma.vitals.findMany({
    where: {
      appointment: {
        appointment_providers: {
          some: {
            provider_id: providerId,
          }
        }
      }
    },
    include: {
      appointment: {
        include: {
          appointment_providers: true,
        }
      }
    }
  });
}


export default {
  buildVitals,
  recordVitals,
  getVitalsByAppointmentId,
  getVitalsByPatientId,
  getVitalsByProviderId,
}
