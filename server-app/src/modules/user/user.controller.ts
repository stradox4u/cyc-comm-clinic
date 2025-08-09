import prisma from '../../config/prisma.js'
import { UserType } from '../../types/index.js'
import catchAsync from '../../utils/catchAsync.js'
import { endOfDay, startOfDay, subMonths } from 'date-fns'

const dashboard = catchAsync(async (req, res) => {
  const { id, type: userType } = req.user!
  const roleTitle = req.user!.roleTitle
  const today = new Date()

  let data: any
  if (userType === UserType.PATIENT) {
    const [nextAppointment, lastVitals, lastSoapNote, upcomingAppointments] =
      await Promise.all([
        prisma.appointment.findFirst({
          where: {
            patient_id: id,
            schedule: { path: ['appointment_date'], gte: today },
          },
          orderBy: { created_at: 'asc' },
        }),
        prisma.vitals.findFirst({
          where: { appointment: { patient_id: id } },
          orderBy: { created_at: 'desc' },
        }),
        prisma.soapNote.findFirst({
          where: { appointment: { patient_id: id } },
          orderBy: { created_at: 'desc' },
        }),
        prisma.appointment.findMany({
          where: {
            patient_id: id,
            schedule: { path: ['appointment_date'], gte: today },
          },
          orderBy: { created_at: 'asc' },
        }),
      ])

    data = { nextAppointment, lastVitals, lastSoapNote, upcomingAppointments }
  } else if (userType === UserType.PROVIDER) {
    const [todayAppointments, totalActivePatientsInLastMonth] =
      await Promise.all([
        prisma.appointment.findMany({
          where: {
            AND: [
              {
                schedule: {
                  path: ['appointment_date'],
                  gte: startOfDay(today),
                },
              },
              {
                schedule: { path: ['appointment_date'], lte: endOfDay(today) },
              },
            ],
          },
          include: {
            patient: { select: { first_name: true, last_name: true } },
          },
        }),
        prisma.patient.count({
          where: {
            appointments: {
              some: { updated_at: { gte: subMonths(today, 1) } },
            },
          },
        }),
      ])
    data = { todayAppointments, totalActivePatientsInLastMonth }
  }

  res.status(200).json({
    success: true,
    data: data,
  })
})

export default { dashboard }
