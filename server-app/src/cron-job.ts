import cron from 'node-cron'
import logger from './middlewares/logger.js'
import prisma from './config/prisma.js'
import { Prisma } from '@prisma/client'
import emailService from './services/email.service.js'

export type AppointmentSchedule = {
  appointment_date: string | Date
  appointment_time: string
  change_count: number
}

type Schedule = (Prisma.JsonFilter<'Appointment'> | undefined) &
  AppointmentSchedule

cron.schedule('0 7 * * *', async () => {
  logger.info('Running cron job at 7:00AM')

  const now = new Date()
  const numberOfDaysFromNow = (days: number) => {
    now.setDate(now.getDate() + days)
    return now
  }

  type AppointmentScheduleAt = Schedule & {
    appointment_date: Prisma.DateTimeFilter<'Appointment'>
  }

  const upcomingAppointments = await prisma.appointment.findMany({
    where: {
      AND: [
        {
          schedule: {
            appointment_date: {
              gte: numberOfDaysFromNow(2),
              lt: numberOfDaysFromNow(3),
            },
          } as AppointmentScheduleAt,
        },
        {
          schedule: {
            appointment_date: {
              gte: now,
              lt: numberOfDaysFromNow(1),
            },
          } as AppointmentScheduleAt,
        },
      ],
    },
    include: { patient: true },
  })

  const emailPromises = upcomingAppointments.map((appointment) => {
    return emailService.sendAppointmentReminderMail(
      appointment,
      appointment.patient
    )
  })

  await Promise.all(emailPromises)

  logger.info('Cron job executed successfully')
})
