import type { Appointment } from '@prisma/client'
import type {
  AppointmentRegisterSchema,
  AppointmentProviderSchema,
} from './appointment.validation.js'
import { scheduleInfoSchema } from './appointment.validation.js'
import appointmentService from './appointment.service.js'
import catchAsync from '../../utils/catchAsync.js'
import { UserType } from '../../types/index.js'
import {
  authorizeUserForViewingAppointment,
  getLoggedInUser,
  authorizeSensitiveAppointmentFields,
  logAppointmentEvents,
  canScheduleAppointment,
  isWithinClinicHours,
} from './appointment.utils.js'
import prisma from '../../config/prisma.js'

const appointmentCreate = catchAsync(async (req, res) => {
  const newAppointment: AppointmentRegisterSchema = req.body
  const loggedInUser = getLoggedInUser(req)

  try {
    authorizeSensitiveAppointmentFields(req, newAppointment)
  } catch (err: any) {
    return res
      .status(err.statusCode || 400)
      .json({ success: false, message: err.message })
  }

  const { appointment_date, appointment_time } = newAppointment.schedule

  if (!appointment_date || !appointment_time) {
    return res.status(400).json({
      success: false,
      message: 'Appointment date and time are required',
    })
  }

  const dateStr =
    appointment_date instanceof Date
      ? appointment_date.toISOString().slice(0, 10)
      : appointment_date

  const dateTimeString = `${dateStr}T${appointment_time.trim()}:00`
  console.log('Date string:', dateTimeString)

  const appointmentDateTime = new Date(dateTimeString)

  if (isNaN(appointmentDateTime.getTime())) {
    console.log('Invalid Date:', appointmentDateTime)
    return res.status(400).json({
      success: false,
      message: 'Invalid date format',
    })
  }

  if (!isWithinClinicHours(appointmentDateTime)) {
    return res.status(400).json({
      success: false,
      message: 'Appointment time must be BETWEEN 8:00 AM and 4:45 PM',
    })
  }

  const existingAppointment =
    await appointmentService.findAppointmentByPatientAndDate(
      newAppointment.patient_id.id,
      appointmentDateTime
    )

  if (!existingAppointment) {
  } else {
    if (!existingAppointment.schedule) {
      throw new Error('Missing schedule data')
    }

    let rawSchedule = existingAppointment.schedule
    if (typeof rawSchedule === 'string') {
      try {
        rawSchedule = JSON.parse(rawSchedule)
      } catch {
        throw new Error('Schedule is not valid JSON')
      }
    }

    const parsedSchedule = scheduleInfoSchema.safeParse(rawSchedule)
    if (!parsedSchedule.success) {
      throw new Error('Invalid schedule data')
    }
    const schedule = parsedSchedule.data
    const existingAppointmentDate = new Date(schedule.appointment_date)

    const check = canScheduleAppointment(appointmentDateTime, [
      existingAppointmentDate,
    ])

    if (!check.allowed) {
      return res.status(400).json({
        success: false,
        message: check.reason,
      })
    }
  }

  const prismaCreateInput: any = {
    ...newAppointment,
    purposes: Array.isArray(newAppointment.purposes)
      ? newAppointment.purposes
      : [newAppointment.purposes],
    other_purpose:
      typeof newAppointment.other_purpose === 'string'
        ? newAppointment.other_purpose
        : '',
    patient: {
      connect: {
        id: newAppointment.patient_id.id,
      },
    },
    patient_id: undefined,
  }

  if (newAppointment.soap_note) {
    prismaCreateInput.soap_note = {
      create: newAppointment.soap_note,
    }
  }

  if (newAppointment.vitals) {
    prismaCreateInput.vitals = {
      create: newAppointment.vitals,
    }
  }

  if (newAppointment.appointment_providers) {
    prismaCreateInput.appointment_providers = {
      create: newAppointment.appointment_providers,
    }
  }

  const savedAppointment = await appointmentService.createAppointment(
    prismaCreateInput
  )

  if (savedAppointment) {
    const vitalsId = (savedAppointment as any).vitals?.id ?? null
    const soapNoteId = (savedAppointment as any).soap_note?.id ?? null

    if (loggedInUser.role === 'PROVIDER') {
      await logAppointmentEvents({
        userId: loggedInUser.id,
        appointmentId: savedAppointment.id,
        statusChanged: true,
        vitalsId,
        soapNoteId,
        soapNoteUpdated: false,
      })
    }

    res.status(201).json({
      success: true,
      message: 'Appointment created succesfully',
      data: savedAppointment,
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
    })
  }
})

const getAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const loggedInUser = getLoggedInUser(req)

  const appointment = await appointmentService.findAppointment({
    id: appointmentId,
  })

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    })
  }

  try {
    authorizeUserForViewingAppointment(appointment, loggedInUser)
  } catch (err: any) {
    return res.status(403).json({ success: false, message: err.message })
  }

  return res.status(200).json({
    success: true,
    message: 'Appointment found',
    data: appointment,
  })
})

const getAppointments = catchAsync(async (req, res) => {
  const loggedInUser = getLoggedInUser(req)

  let appointments: Appointment[] = []

  if (loggedInUser?.type === UserType.PATIENT) {
    appointments = await appointmentService.findAppointmentsByPatient(
      loggedInUser.id
    )
  } else if (loggedInUser?.type === UserType.PROVIDER) {
    if (
      loggedInUser.roleTitle === 'ADMIN' ||
      loggedInUser.roleTitle === 'RECEPTIONIST'
    ) {
      appointments = await appointmentService.searchAppointments({})
    } else {
      appointments = await appointmentService.findAppointmentsByProvider(
        loggedInUser.id
      )
    }
  } else {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized Access',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Appointments fetched successfully',
    data: appointments,
  })
})

const updateAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const loggedInUser = getLoggedInUser(req)
  const userId = loggedInUser.id
  const updateData = req.body

  const appointment = await appointmentService.findAppointment({
    id: appointmentId,
  })

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    })
  }

  try {
    authorizeUserForViewingAppointment(appointment, loggedInUser)
    authorizeSensitiveAppointmentFields(req, updateData)
  } catch (err: any) {
    return res
      .status(err.statusCode || 400)
      .json({ success: false, message: err.message })
  }

  if (updateData.schedule) {
    const { appointment_date, appointment_time } = updateData.schedule

    if (!appointment_date || !appointment_time) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date and time are required',
      })
    }

    const dateStr =
      appointment_date instanceof Date
        ? appointment_date.toISOString().slice(0, 10)
        : appointment_date

    const dateTimeString = `${dateStr}T${appointment_time.trim()}:00`
    console.log('Date string:', dateTimeString)

    const newAppointmentDateTime = new Date(dateTimeString)
    if (!appointment_date || !appointment_time) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date and time are required',
      })
    }

    const existingAppointment =
      await appointmentService.findAppointmentByPatientAndDate(
        appointment.patient_id,
        newAppointmentDateTime
      )

    if (existingAppointment && existingAppointment.id !== appointmentId) {
      const parsedSchedule = scheduleInfoSchema.safeParse(
        existingAppointment.schedule
      )
      if (!parsedSchedule.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid schedule data for existing appointment',
        })
      }

      const existingAppointmentDate = new Date(
        parsedSchedule.data.appointment_date
      )
      const check = canScheduleAppointment(newAppointmentDateTime, [
        existingAppointmentDate,
      ])

      if (!check.allowed) {
        return res.status(400).json({ success: false, message: check.reason })
      }
    }

    const checkWorkHours = canScheduleAppointment(newAppointmentDateTime, [])
    if (!checkWorkHours.allowed) {
      return res
        .status(400)
        .json({ success: false, message: checkWorkHours.reason })
    }
  }

  const previousStatus = appointment.status
  const newStatus = updateData.status

  const updatedAppointment = await appointmentService.updateAppointment(
    { id: appointmentId },
    updateData,
    userId
  )

  const statusChanged = newStatus !== undefined && newStatus !== previousStatus

  if (loggedInUser.role === 'PROVIDER') {
    await logAppointmentEvents({
      userId,
      appointmentId,
      statusChanged,
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Appointment updated successfully',
    data: updatedAppointment,
  })
})

const appointmentDelete = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const loggedInUser = getLoggedInUser(req)

  const appointment = await appointmentService.findAppointment({
    id: appointmentId,
  })

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    })
  }

  const deletedAppointment = await appointmentService.deleteAppointment({
    id: appointmentId,
  })

  if (deletedAppointment) {
    return res.status(204).json()
  }

  return res.status(500).json({
    success: false,
    message: 'Failed to delete appointment',
  })
})

const assignAppointmentProvider = catchAsync(async (req, res) => {
  const loggedInUser = getLoggedInUser(req)
  const newAppointmentProvider: AppointmentProviderSchema | undefined = req.body

  if (!newAppointmentProvider) {
    return res.status(400).json({
      success: false,
      message: 'Appointment provider data is required',
    })
  }

  const { appointment_id, provider_id } = newAppointmentProvider

  const appointment = await appointmentService.findAppointment({
    id: appointment_id,
  })
  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    })
  }

  try {
    authorizeSensitiveAppointmentFields(req, appointment)
  } catch (err: any) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    })
  }

  const assignedProvider = await appointmentService.assignProvider({
    appointment: { connect: { id: newAppointmentProvider.appointment_id } },
    provider: { connect: { id: newAppointmentProvider.provider_id } },
  })

  return res.status(200).json({
    success: true,
    message: 'Appointment provider assigned successfully',
    data: assignedProvider,
  })
})

const waitTimeTracking = catchAsync(async (req, res) => {
  const loggedInUser = getLoggedInUser(req)

  if (!loggedInUser) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: User not found',
    })
  }

  let averageWaitTime

  if (
    loggedInUser.role_title === 'ADMIN' ||
    loggedInUser.role_title === 'RECEPTIONIST'
  ) {
    averageWaitTime =
      await appointmentService.getAverageWaitTimeForAllProviders()
  } else {
    averageWaitTime = await appointmentService.getAverageWaitTimeForProvider(
      loggedInUser.id
    )
  }

  if (
    !averageWaitTime ||
    (Array.isArray(averageWaitTime) && averageWaitTime.length === 0)
  ) {
    averageWaitTime = 0 // Default to 0 if no data found
  }

  return res.status(200).json({
    success: true,
    message:
      loggedInUser.role_title === 'ADMIN' ||
      loggedInUser.role_title === 'RECEPTIONIST'
        ? 'Wait times for all providers'
        : 'Wait time for this provider',
    data: averageWaitTime,
  })
})

const patchAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params
  const updates = req.body
  const loggedInUser = getLoggedInUser(req)

  const appointment = await appointmentService.findAppointment({
    id: appointmentId,
  })

  if (!appointment) {
    return res
      .status(404)
      .json({ success: false, message: 'Appointment not found' })
  }

  try {
    authorizeUserForViewingAppointment(appointment, loggedInUser)
    authorizeSensitiveAppointmentFields(req, updates)
  } catch (err: any) {
    return res
      .status(err.statusCode || 403)
      .json({ success: false, message: err.message })
  }

  const previousStatus = appointment.status
  const updated = await prisma.appointment.update({
    where: { id: appointmentId },
    data: updates,
  })

  const statusChanged = updates.status && updates.status !== previousStatus

  if (loggedInUser.role === 'PROVIDER' && statusChanged) {
    await logAppointmentEvents({
      userId: loggedInUser.id,
      appointmentId,
      statusChanged,
    })
  }

  res
    .status(200)
    .json({ success: true, message: 'Appointment updated', data: updated })
})

const getNoShowRates = catchAsync(async (req, res) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' })
  }

  let data

  if (user.roleTitle === 'ADMIN' || user.roleTitle === 'RECEPTIONIST') {
    data = await appointmentService.getNoShowRatesForAdmin()
  } else if (user.type === UserType.PROVIDER) {
    data = await appointmentService.getNoShowRatesPerProviderPatient(user.id, true)
  } else {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
   data = 0
  }

  res.status(200).json({
    success: true,
    message: 'No-show rates fetched successfully',
    data,
  })
})

export default {
  appointmentCreate,
  getAppointment,
  getAppointments,
  updateAppointment,
  appointmentDelete,
  assignAppointmentProvider,
  waitTimeTracking,
  patchAppointment,
  getNoShowRates,
}
