import {
  type Appointment,
  type AppointmentProviders,
  type Prisma,
  type Vitals,
  type SoapNote,
  EventType,
  AppointmentStatus,
} from '@prisma/client'
import prisma from '../../config/prisma.js'
import { startOfDay, endOfDay } from 'date-fns'
import {
  calculateWaitTimeMinutes,
  calculateNoShowRate,
} from './appointment.utils.js'

export type AppointmentWhereUniqueInput = Prisma.AppointmentWhereUniqueInput
export type AppointmentWhereInput = Prisma.AppointmentWhereInput
export type AppointmentCreateInput = Prisma.AppointmentCreateInput
export type AppointmentUpdateInput = Prisma.AppointmentUpdateInput
export type AppointmentUncheckedUpdateInput =
  Prisma.AppointmentUncheckedUpdateInput

export type AppointmentProvidersUncheckedCreateInput =
  Prisma.AppointmentProvidersUncheckedCreateInput
export type AppointmentProvidersWhereInput =
  Prisma.AppointmentProvidersWhereInput

// Create Appointment
async function createAppointment(
  payload: AppointmentCreateInput
): Promise<Appointment> {
  return prisma.appointment.create({
    data: payload,
    include: {
      vitals: true,
      soap_note: true,
    },
  })
}

{
  /*Schedule is Json so custom function to sort
  appointment by earliest date
  */
}

function sortAppointmentsByEarliestDate(appointments: Appointment[]) {
  const getEarlistDate = (appt: Appointment): Date => {
    let scheduleObj: any = appt.schedule
    if (typeof scheduleObj === 'string') {
      try {
        scheduleObj = JSON.parse(scheduleObj)
      } catch {
        scheduleObj = {}
      }
    }
    if (
      scheduleObj &&
      typeof scheduleObj === 'object' &&
      'appointment_date' in scheduleObj
    ) {
      return new Date(scheduleObj.appointment_date)
    }
    if (appt.created_at) {
      return new Date(appt.created_at)
    }
    return new Date(appt.updated_at)
  }
  return appointments.sort((a, b) => {
    const dateA = getEarlistDate(a).getTime()
    const dateB = getEarlistDate(b).getTime()
    return dateA - dateB
  })
}

// Get single Appointment
async function findAppointment(filter: AppointmentWhereUniqueInput): Promise<
  | (Appointment & {
      appointment_providers: AppointmentProviders[]
      vitals?: Vitals | null
      soap_note: SoapNote[]
    })
  | null
> {
  const appointment = await prisma.appointment.findUnique({
    where: filter,
    include: {
      appointment_providers: true,
      vitals: true,
      soap_note: true,
      patient: true,
    },
  })

  if (appointment && !appointment.appointment_providers) {
    appointment.appointment_providers = []
  }
  return appointment
}

// Get by status(search)
async function searchAppointments(
  filter: AppointmentWhereInput
): Promise<Appointment[]> {
  const appointments = await prisma.appointment.findMany({
    where: filter,
    include: {
      appointment_providers: {
        include: {
          provider: {
            select: {
              role_title: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      },
      patient: true
    },
  })
  return sortAppointmentsByEarliestDate(appointments)
}

// Find appointments by patient
async function findAppointmentsByPatient(
  patient_id: string,
  filter?: Prisma.AppointmentWhereInput
): Promise<Appointment[]> {
  const appointments = await prisma.appointment.findMany({
    where: {
      patient_id,
      ...(filter || {}),
    },
    include: {
      appointment_providers: {
        include: {
          provider: {
            select: {
              role_title: true,
              first_name: true,
              last_name: true,
            },
          },
        },
      },
      patient: true
    },
  })
  return sortAppointmentsByEarliestDate(appointments)
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
          appointment_providers: {
            include: {
              provider: {
                select: {
                  role_title: true,
                  first_name: true,
                  last_name: true,
                },
              },
            },
          },
          patient: true
        },
      },
    },
  })
  const appointments = appointmentProviders.map((entry) => entry.appointment)
  return sortAppointmentsByEarliestDate(appointments)
}

{
  /*Update Appointment
(vitals and soap_note intragration handled too)
rescheduled count handled
  */
}
async function updateAppointment(
  filter: AppointmentWhereUniqueInput,
  payload: AppointmentUpdateInput & { vitals?: any; soap_note?: any[] },
  userId: string
): Promise<
  Appointment & {
    vitals?: any
    soap_note?: any[]
  }
> {
  const { vitals, soap_note, ...rest } = payload
  const existing = await prisma.appointment.findUnique({
    where: filter,
    select: { status: true, schedule: true },
  })

  const statusChangeToNoShow =
    existing?.status !== 'NO_SHOW' &&
    ((typeof rest.status === 'string' && rest.status === 'NO_SHOW') ||
      (typeof rest.status === 'object' &&
        rest.status !== null &&
        'set' in rest.status &&
        rest.status.set === 'NO_SHOW'))

  const statusChangeToAttending =
    existing?.status === 'CHECKED_IN' &&
    ((typeof rest.status === 'string' && rest.status === 'ATTENDING') ||
      (typeof rest.status === 'object' &&
        rest.status !== null &&
        'set' in rest.status &&
        rest.status.set === 'ATTENDING'))

  const statusChangeToCheckedIn =
    existing?.status !== 'CHECKED_IN' &&
    ((typeof rest.status === 'string' && rest.status === 'CHECKED_IN') ||
      (typeof rest.status === 'object' &&
        rest.status !== null &&
        'set' in rest.status &&
        rest.status.set === 'CHECKED_IN'))

  const isRescheduled =
    (typeof rest.status === 'string' && rest.status === 'RESCHEDULED') ||
    (typeof rest.status === 'object' &&
      rest.status !== null &&
      'set' in rest.status &&
      rest.status.set === 'RESCHEDULED')

  let updatedSchedule = rest.schedule
  if (isRescheduled) {
    const currentSchedule =
      typeof existing?.schedule === 'string'
        ? JSON.parse(existing.schedule)
        : existing?.schedule ?? {}

    updatedSchedule = {
      ...currentSchedule,
      ...(typeof updatedSchedule === 'object' ? updatedSchedule : {}),
      schedule_count: (currentSchedule.schedule_count ?? 0) + 1,
    }
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
  }

  const newEvents = []
  if (statusChangeToCheckedIn) {
    newEvents.push({
      type: EventType.APPOINTMENT_STATUS_CHANGED,
      status: 'CHECKED_IN',
      created_at: new Date(),
      created_by_id: userId,
    })
  }

  if (statusChangeToAttending) {
    newEvents.push({
      type: EventType.APPOINTMENT_STATUS_CHANGED,
      status: 'ATTENDING',
      created_at: new Date(),
      created_by_id: userId,
    })
  }

  if (statusChangeToNoShow) {
    newEvents.push({
      type: EventType.APPOINTMENT_STATUS_CHANGED,
      status: 'NO_SHOW',
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
  })
}

// wait time service
export async function getAverageWaitTimeForProvider(
  providerId: string
): Promise<number | null> {
  const appointmentProviders = await prisma.appointmentProviders.findMany({
    where: { provider_id: providerId },
    select: { appointment_id: true },
  })

  if (appointmentProviders.length === 0) return null

  const waitTimes = await Promise.all(
    appointmentProviders.map(async ({ appointment_id }) => {
      const events = await prisma.events.findMany({
        where: {
          appointment_id,
          type: EventType.APPOINTMENT_STATUS_CHANGED,
        },
        orderBy: { created_at: 'desc' },
      })

      const checkedInEvent = events.find((e) => e.status === 'CHECKED_IN')
      const attendingEvent = events.find((e) => e.status === 'ATTENDING')

      if (!checkedInEvent || !attendingEvent) return null

      return calculateWaitTimeMinutes(
        new Date(checkedInEvent.created_at),
        new Date(attendingEvent.created_at)
      )
    })
  )

  const validWaitTimes = waitTimes.filter((wt): wt is number => wt !== null)

  if (validWaitTimes.length === 0) return null

  const sum = validWaitTimes.reduce((a, b) => a + b, 0)
  const average = sum / validWaitTimes.length

  return average
}

// Admin wait time service for all Provider
export async function getAverageWaitTimeForAllProviders(): Promise<
  {
    providerId: string
    providerName: string
    averageWaitTime: number | null
  }[]
> {
  const providers = await prisma.provider.findMany({
    select: {
      id: true,
      role_title: true,
      first_name: true,
      last_name: true,
    },
  })
  const results = await Promise.all(
    providers.map(async (provider) => {
      const avgWaitTime = await getAverageWaitTimeForProvider(provider.id)
      return {
        providerId: provider.id,
        providerName: `${provider.role_title} ${provider.first_name} ${provider.last_name}`,
        averageWaitTime: avgWaitTime,
      }
    })
  )
  return results
}

//Cancel or Delete Appointment
async function deleteAppointment(
  filter: AppointmentWhereUniqueInput
): Promise<Appointment> {
  await prisma.appointmentProviders.deleteMany({
    where: {
      appointment_id: filter.id,
    },
  })

  await prisma.vitals.deleteMany({
    where: {
      appointment_id: filter.id,
    },
  })

  await prisma.soapNote.deleteMany({
    where: {
      appointment_id: filter.id,
    },
  })

  return prisma.appointment.delete({
    where: filter,
  })
}

//Assign Provider (AppointmentProviders)
async function assignProvider(
  payload: AppointmentProvidersUncheckedCreateInput
): Promise<
  [
    (Appointment & { patient: { first_name: string; email: string } }) | null,
    boolean
  ]
> {
  const alreadyScheduled = await prisma.appointmentProviders.findFirst({
    where: { appointment_id: payload.appointment_id },
  })

  if (!alreadyScheduled) {
    await prisma.$transaction([
      prisma.appointment.update({
        where: { id: payload.appointment_id },
        data: { status: AppointmentStatus.SCHEDULED },
      }),
      prisma.appointmentProviders.create({ data: payload }),
    ])
  }

  return [
    await prisma.appointment.findUnique({
      where: { id: payload.appointment_id },
      include: {
        appointment_providers: {
          include: {
            provider: { select: { first_name: true, last_name: true } },
          },
        },
        patient: { select: { first_name: true, email: true } },
      },
    }),
    !!alreadyScheduled,
  ]
}

function isProviderArray(arr: any): arr is { provider_id: string }[] {
  return (
    Array.isArray(arr) && arr.every((p) => typeof p.provider_id === 'string')
  )
}

//Assign Providers while creating appointment
function buildProvidersCreate(
  providers: any
): { create: { provider_id: string }[] } | undefined {
  if (!isProviderArray(providers)) return undefined

  return {
    create: providers.map(({ provider_id }) => ({ provider_id })),
  }
}

async function findAppointmentByPatientAndDate(patientId: string, date: Date) {
  return prisma.appointment.findFirst({
    where: {
      patient_id: patientId,
      schedule: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  })
}

async function getNoShowRatesPerProviderPatient(
  providerId?: string,
  returnOnlyNumber = false
): Promise<
  | {
      providerId: string
      patients: {
        patientId: string
        noShowRate: number
      }[]
    }[]
  | number
> {
  if (returnOnlyNumber) {
    const whereFilter = providerId
      ? {
          appointment_providers: {
            some: { provider_id: providerId },
          },
        }
      : {}
    const appointment = await prisma.appointment.findMany({
      where: whereFilter,
      select: {
        status: true,
      },
    })
    return calculateNoShowRate(appointment)
  }

  const providers = providerId
    ? [{ provider_id: providerId }]
    : await prisma.appointmentProviders.findMany({
        distinct: ['provider_id'],
        select: {
          provider_id: true,
        },
      })

  const result = []

  for (const { provider_id } of providers) {
    const patients = await prisma.appointment.findMany({
      where: {
        appointment_providers: {
          some: { provider_id },
        },
      },
      distinct: ['patient_id'],
      select: { patient_id: true },
    })

    const patientsWithRates = []

    for (const { patient_id } of patients) {
      const appointments = await prisma.appointment.findMany({
        where: {
          patient_id,
          appointment_providers: {
            some: { provider_id },
          },
        },
        select: {
          status: true,
        },
      })

      const noShowRate = calculateNoShowRate(appointments)

      patientsWithRates.push({
        patientId: patient_id,
        noShowRate,
      })
    }

    result.push({
      providerId: provider_id,
      patients: patientsWithRates,
    })
  }
  return result
}

async function getNoShowRatesForAdmin() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const appointments = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          created_at: {
            gte: thirtyDaysAgo,
          },
        },
        {
          updated_at: {
            gte: thirtyDaysAgo,
          },
        },
      ],
    },
  })
  const noShowRate = calculateNoShowRate(appointments)
  return noShowRate
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
  getAverageWaitTimeForAllProviders,
  getNoShowRatesPerProviderPatient,
  getNoShowRatesForAdmin,
}
