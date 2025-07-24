import type { Appointment, AppointmentProviders, Prisma } from "@prisma/client";
import prisma from "../../config/prisma.js";

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
        data: payload
    })
}

// Get single Appointment
async function findAppointment(
    filter: AppointmentWhereUniqueInput
): Promise<Appointment | null> {
    return await prisma.appointment.findUnique({
        where: filter,
    })
}

// Get by status(search)
async function searchAppointment(
    filter: AppointmentWhereInput
): Promise<Appointment[]> {
    return await prisma.appointment.findMany({
        where: filter,
    })
}

// Get Appointments
async function findAppointments(
    filter: AppointmentWhereInput
): Promise<Appointment[]> {
    return prisma.appointment.findMany({
        where: filter,
    })
}

// Find by appointment provider
async function findAppointmentsByProvider(
    filter: AppointmentProvidersWhereInput
): Promise<AppointmentProviders[]> {
    return prisma.appointmentProviders.findMany({
        where: filter,
    })
}

//Update Appointment
async function updateAppointment(
    filter: AppointmentWhereUniqueInput,
    payload: AppointmentUpdateInput
): Promise<Appointment> {
    return prisma.appointment.update({
        where: filter,
        data: payload,
    })
}

//Cancel or Delete Appointment
async function deleteAppointment(
    filter: AppointmentWhereUniqueInput
): Promise<Appointment> {
    return prisma.appointment.delete({
        where: filter,
    });
}

//Schedule Count Update
async function updateAppointmentWithScheduleCount(
  appointmentId: string,
  updateData: AppointmentUncheckedUpdateInput
): Promise<Appointment> {
  const isRescheduled =
    (typeof updateData.status === "string" && updateData.status === "RESCHEDULED") ||
    (typeof updateData.status === "object" && updateData.status !== null && "set" in updateData.status && updateData.status.set === "RESCHEDULED");

  if (isRescheduled) {
    const { schedule_count, ...restUpdateData } = updateData as any;
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        ...restUpdateData,
        schedule_count: {
          increment: 1,
        },
      },
    });
  } else {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
    });
  }
}


//Assign Provider (AppointmentProviders)
async function assignProvider(
  data: AppointmentProvidersCreateInput
): Promise<AppointmentProviders> {
  return prisma.appointmentProviders.create({
    data
  });
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



//Integrate with vitals and soap note


export default {
    createAppointment,
    findAppointment,
    findAppointments,
    findAppointmentsByProvider,
    searchAppointment,
    updateAppointment,
    deleteAppointment,
    assignProvider,
    updateAppointmentWithScheduleCount,
    buildProvidersCreate
}