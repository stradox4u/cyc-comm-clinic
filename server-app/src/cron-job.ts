import cron from 'node-cron'
import logger from './middlewares/logger.js'
import prisma from './config/prisma.js'
import {
  AppointmentPurpose,
  AppointmentStatus,
  Prisma,
  type Appointment,
  type Patient,
} from '@prisma/client'
import emailService from './services/email.service.js'

export type AppointmentSchedule = {
  appointment_date: string | Date
  appointment_time: string
  change_count: number
}

export type NoShowAppointment = {
  id: string
  schedule: AppointmentSchedule
  purposes: AppointmentPurpose[]
  email: string
  first_name: string
}

cron.schedule('0 7 * * *', async () => {
  logger.info('Running appointment reminder cron job at 7:00AM')

  const upcomingAppointments = (await prisma.$queryRaw`
    SELECT a.*, p.*
    FROM "appointments" a
    JOIN "patients" p ON p.id = a."patient_id"
    WHERE (
      TO_DATE(a.schedule->>'appointment_date', 'YYYY-MM-DD')
      BETWEEN CURRENT_DATE + interval '2 day' AND CURRENT_DATE + interval '3 day'
    )
    OR (
      TO_DATE(a.schedule->>'appointment_date', 'YYYY-MM-DD')
      BETWEEN CURRENT_DATE AND CURRENT_DATE + interval '1 day'
    )
  `) as (Appointment & Patient)[]

  const emailPromises = upcomingAppointments.map((appointment) => {
    return emailService.sendAppointmentReminderMail(appointment, {
      email: appointment.email,
      first_name: appointment.first_name,
    })
  })

  await Promise.all(emailPromises)

  logger.info('Appointment reminder cron job executed successfully')
})

cron.schedule('0 19 * * *', async () => {
  logger.info('Running appointment no-show cron job at 7:00PM')

  const noShowAppointments = await prisma.$queryRaw<
    NoShowAppointment[]
  >(Prisma.sql`
    UPDATE "appointments"
    SET status = ${AppointmentStatus.NO_SHOW}
    WHERE status = ${AppointmentStatus.SCHEDULED}
      AND (schedule->>'appointment_date')::date <= CURRENT_DATE
    RETURNING id, schedule, purposes, email, first_name
  `)

  const emailPromises = noShowAppointments.map((appointment) => {
    return emailService.sendAppointmentResheduleRequestMail(appointment, {
      email: appointment.email,
      first_name: appointment.first_name,
    })
  })

  await Promise.all(emailPromises)

  logger.info('Appointment no-show cron job executed successfully')
})
