import type { Vitals, Prisma } from '@prisma/client';
import prisma from '../../config/prisma.js';
import type { VitalsRecord } from '../vitals/vitals.validation.js';
import { EventType } from '@prisma/client';

export type VitalsCreateInput = Prisma.VitalsCreateInput

// for nested vitals in appointment create
function buildVitals(
  payload: VitalsRecord | undefined,
  createdById: string
): { create: Omit<VitalsRecord, 'events'> & { events: { create: { type: EventType, created_by_id: string }[] } } } | undefined {
  if (!payload) return undefined;

  const { events, ...rest } = payload;

  return {
    create: {
      ...rest,
      events: {
        create: [
          {
            type: EventType.VITALS_RECORDED,
            created_by_id: createdById,
          }
        ]
      }
    }
  };
}

async function recordVitals(
  payload: VitalsCreateInput,
  createdById: string
): Promise<Vitals> {
  return prisma.vitals.create({
    data: {
      ...payload,
      events: {
        create: [{
          type: EventType.VITALS_RECORDED,
          created_by_id: createdById,
        }]
      }
    }
  });
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
