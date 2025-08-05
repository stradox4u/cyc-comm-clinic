import {
  type Appointment,
  type AppointmentProviders,
  type Prisma,
  type Vitals,
  type SoapNote,
  EventType
} from "@prisma/client";
import prisma from "../../config/prisma.js";
import { startOfDay, endOfDay } from 'date-fns';
import { includes } from "zod";
import { calculateWaitTimeMinutes } from "./appointment.utils.js";

export type AppointmentWhereUniqueInput = Prisma.AppointmentWhereUniqueInput
export type AppointmentWhereInput = Prisma.AppointmentWhereInput
export type AppointmentCreateInput = Prisma.AppointmentCreateInput
export type AppointmentUpdateInput = Prisma.AppointmentUpdateInput
export type AppointmentUncheckedUpdateInput = Prisma.AppointmentUncheckedUpdateInput

export type AppointmentProvidersCreateInput = Prisma.AppointmentProvidersCreateInput
export type AppointmentProvidersWhereInput = Prisma.AppointmentProvidersWhereInput


// Create Appointment
async function createAppointment(
    payload: AppointmentCreateInput
): Promise<Appointment> {
    return prisma.appointment.create({
        data: payload,
        include: {
            vitals: true,
            soap_note: true,
        }
    })
  }

// Get single Appointment
async function findAppointment(
  filter: AppointmentWhereUniqueInput
): Promise<
  | (Appointment & {
      appointment_providers: AppointmentProviders[];
      vitals?: Vitals | null;
      soap_note: SoapNote[];
    })
  | null
> {
  const appointment = await prisma.appointment.findUnique({
    where: filter,
    include: {
      appointment_providers: true,
      vitals: true,
      soap_note: true,
    },
  });

  if (appointment && !appointment.appointment_providers) {
    appointment.appointment_providers = [];
  }
  return appointment;
}

// Get by status(search)
async function searchAppointments(
    filter: AppointmentWhereInput
): Promise<Appointment[]> {
    return await prisma.appointment.findMany({
        where: filter,
    })
}

// Find appointments by patient
async function findAppointmentsByPatient(
  patient_id: string,
  filter?: Prisma.AppointmentWhereInput
): Promise<Appointment[]> {
  return prisma.appointment.findMany({
    where: {
      patient_id,
      ...(filter || {})
    },
    include: {
      appointment_providers: true,
    },
  });
}

// Find appointments by provider
async function findAppointmentsByProvider(
  provider_id: string,
  filter?: Prisma.AppointmentProvidersWhereInput
): Promise<Appointment[]> {
  const appointmentProviders = await prisma.appointmentProviders.findMany({
    where: {
      provider_id,
      ...(filter || {}),
    },
    include: {
      appointment: {
        include: {
          appointment_providers: true,
        },
      },
    },
  });
  return appointmentProviders.map((entry) => entry.appointment);
}

{/*Update Appointment
(vitals and soap_note intragration handled too)
rescheduled count handled
  */}
async function updateAppointment(
  filter: AppointmentWhereUniqueInput,
  payload: AppointmentUpdateInput & { vitals?: any; soap_note?: any[] },
  userId: string
): Promise<
  Appointment & {
    vitals?: any;
    soap_note?: any[];
  }
> {
  const { vitals, soap_note, ...rest } = payload;
  const existing = await prisma.appointment.findUnique({
    where: filter,
    select: { status: true, schedule: true },
  });

  const statusChangeToNoShow =
    existing?.status !== "NO_SHOW" &&
      ((typeof rest.status === "string" && rest.status === "NO_SHOW") ||
       (typeof rest.status === "object" &&
        rest.status !== null &&
        "set" in rest.status &&
        rest.status.set === "NO_SHOW"));

  const statusChangeToAttending =
    existing?.status === "CHECKED_IN" &&
    ((typeof rest.status === "string" && rest.status === "ATTENDING") ||
      (typeof rest.status === "object" &&
        rest.status !== null &&
        "set" in rest.status &&
        rest.status.set === "ATTENDING"));

  const statusChangeToCheckedIn =
    existing?.status !== "CHECKED_IN" &&
    ((typeof rest.status === "string" && rest.status === "CHECKED_IN") ||
      (typeof rest.status === "object" &&
        rest.status !== null &&
        "set" in rest.status &&
        rest.status.set === "CHECKED_IN"));

  const isRescheduled =
    (typeof rest.status === "string" && rest.status === "RESCHEDULED") ||
    (typeof rest.status === "object" &&
      rest.status !== null &&
      "set" in rest.status &&
      rest.status.set === "RESCHEDULED");

  let updatedSchedule = rest.schedule;
  if (isRescheduled) {
    const currentSchedule =
      typeof existing?.schedule === "string"
        ? JSON.parse(existing.schedule)
        : existing?.schedule ?? {};

    updatedSchedule = {
      ...currentSchedule,
      ...(typeof updatedSchedule === "object" ? updatedSchedule : {}),
      schedule_count: (currentSchedule.schedule_count ?? 0) + 1,
    };
  }

  const prismaData: Prisma.AppointmentUpdateInput = {
    ...rest,
    ...(updatedSchedule ? { schedule: updatedSchedule } : {}),
    ...(vitals
      ? 'id' in vitals && vitals.id
        ? { vitals: { update: { ...vitals, id: undefined } } }
        : { vitals: { create: vitals } }
      : {}),
    ...(soap_note && Array.isArray(soap_note)
      ? {
          soap_note: {
            update: soap_note
              .filter((n) => n.id)
              .map(({ id, ...data }) => ({ where: { id }, data })),
            create: soap_note.filter((n) => !n.id),
          },
        }
      : {}),
  };

  const newEvents = [];
  if (statusChangeToCheckedIn) {
    newEvents.push({
      type: EventType.APPOINTMENT_STATUS_CHANGED,
      status: "CHECKED_IN",
      created_at: new Date(),
      created_by_id: userId,
    })
  }

  if (statusChangeToAttending) {
    newEvents.push({
      type: EventType.APPOINTMENT_STATUS_CHANGED,
      status: "ATTENDING",
      created_at: new Date(),
      created_by_id: userId,
    })
  }

  if (statusChangeToNoShow) {
    newEvents.push({
      type: EventType.APPOINTMENT_STATUS_CHANGED,
      status: "NO_SHOW",
      created_at: new Date(),
      created_by_id: userId,
    })
  }
  return prisma.appointment.update({
    where: filter,
    data: {
      ...prismaData,
      ...(newEvents.length > 0 ? { events: { create: newEvents } } : {}),
    },
    include: {
      vitals: true,
      soap_note: true,
      appointment_providers: true,
    },
  });
}

// wait time service
export async function getAverageWaitTimeForProvider(providerId: string): Promise<number | null> {
  const appointmentProviders = await prisma.appointmentProviders.findMany({
    where: { provider_id: providerId },
    select: { appointment_id: true },
  });

  if (appointmentProviders.length === 0) return null;

  const waitTimes = await Promise.all(
    appointmentProviders.map(async ({ appointment_id }) => {
      const events = await prisma.events.findMany({
        where: {
          appointment_id,
          type: EventType.APPOINTMENT_STATUS_CHANGED,
        },
        orderBy: { created_at: 'desc' },
      });

      const checkedInEvent = events.find(e => e.status === 'CHECKED_IN');
      const attendingEvent = events.find(e => e.status === 'ATTENDING');

      if (!checkedInEvent || !attendingEvent) return null;

      return calculateWaitTimeMinutes(
        new Date(checkedInEvent.created_at),
        new Date(attendingEvent.created_at)
      );
    })
  );

  const validWaitTimes = waitTimes.filter((wt): wt is number => wt !== null);

  if (validWaitTimes.length === 0) return null;

  const sum = validWaitTimes.reduce((a, b) => a + b, 0);
  const average = sum / validWaitTimes.length;

  return average;
}

// Admin wait time service for all Provider
export async function getAverageWaitTimeForAllProviders(): Promise<
  {
    providerId: string,
    providerName: string,
    averageWaitTime: number | null
  } []
>{
  const providers = await prisma.provider.findMany({
    select: {
      id: true,
      role_title: true,
      first_name: true,
      last_name: true,
    }
  });
  const results = await Promise.all(
    providers.map(async (provider) => {
      const avgWaitTime = await getAverageWaitTimeForProvider(provider.id)
      return {
        providerId: provider.id,
        providerName: `${provider.role_title} ${provider.first_name} ${provider.last_name}`,
        averageWaitTime: avgWaitTime,
      }
    })
  );
  return results;
}

//Cancel or Delete Appointment
async function deleteAppointment(
    filter: AppointmentWhereUniqueInput
): Promise<Appointment> {
    await prisma.appointmentProviders.deleteMany({
      where: {
        appointment_id: filter.id
      }
    })

    await prisma.vitals.deleteMany({
      where: {
        appointment_id: filter.id
      }
    })

    await prisma.soapNote.deleteMany({
      where: {
        appointment_id: filter.id
      }
    })

    return prisma.appointment.delete({
        where: filter,
    });
}

//Assign Provider (AppointmentProviders)
async function assignProvider(
  data: AppointmentProvidersCreateInput
): Promise<Appointment | null> {
  await prisma.appointmentProviders.create({ data });
  const appointmentId = data.appointment?.connect?.id;
  return appointmentId
    ? prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: {
          appointment_providers: {
            include: {
              provider: {
                select: {
                  first_name: true,
                  last_name: true,
                }
              }
            }
          }
        },
      })
    : null;
}

function isProviderArray(arr: any): arr is { provider_id: string }[] {
  return Array.isArray(arr) && arr.every(p => typeof p.provider_id === "string");
}

//Assign Providers while creating appointment
function buildProvidersCreate(
  providers: any
): { create: { provider_id: string }[] } | undefined {
  if (!isProviderArray(providers)) return undefined;

  return {
    create: providers.map(({ provider_id }) => ({ provider_id })),
  };
}

export async function findAppointmentByPatientAndDate(patientId: string, date: Date) {
  return prisma.appointment.findFirst({
    where: {
      patient_id: patientId,
      schedule: {
        gte: startOfDay(date),
        lte: endOfDay(date)
      }
    }
  });
}


export default {
    createAppointment,
    findAppointment,
    findAppointmentsByPatient,
    findAppointmentsByProvider,
    updateAppointment,
    deleteAppointment,
    assignProvider,
    findAppointmentByPatientAndDate,
    buildProvidersCreate,
    searchAppointments,
    getAverageWaitTimeForProvider,
    getAverageWaitTimeForAllProviders
}
