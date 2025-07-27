import cron from 'node-cron'
import logger from './middlewares/logger.js'
import prisma from './config/prisma.js'
import type { Appointment, Patient } from '@prisma/client'
import emailService from './services/email.service.js'

export type AppointmentSchedule = {
  appointment_date: string | Date
  appointment_time: string
  change_count: number
}

cron.schedule('0 7 * * *', async () => {
  logger.info('Running cron job at 7:00AM')

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

  logger.info('Cron job executed successfully')
})
