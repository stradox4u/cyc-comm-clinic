import bcrypt from 'bcryptjs'
import {
  NotFoundError,
  ValidationError,
} from '../../middlewares/errorHandler.js'
import catchAsync from '../../utils/catchAsync.js'
import patientService, { type PatientWhereInput } from './patient.service.js'
import type {
  CreatePatientSchema,
  UpdatePatientSchema,
} from './patient.validation.js'
import awsS3 from '../../config/aws-s3.js'

const getPatients = catchAsync(async (req, res) => {
  const { page, limit } = req.query
  const options = { page: Number(page), limit: Number(limit) }

  const [patients, total] = await patientService.findPatients({}, options)

  const data = await Promise.all(
    patients.map(async (patient) => {
      const [lastVisit, nextAppointment] =
        await patientService.findPatientStats({
          patient_id: patient.id,
        })
      return { ...patient, lastVisit, nextAppointment }
    })
  )

  res.status(200).json({
    success: true,
    data: data,
    total: total,
  })
})

const getPatientsStats = catchAsync(async (req, res) => {
  const [
    totalPatients,
    totalActivePatientsInLastMonth,
    totalRegistrationsInLastMonth,
  ] = await patientService.findPatientsStats()

  const data = {
    totalPatients,
    totalActivePatientsInLastMonth,
    totalRegistrationsInLastMonth,
  }

  res.status(200).json({
    success: true,
    data: data,
  })
})

const searchPatientsByName = catchAsync(async (req, res) => {
  const query = req.query

  const filter: PatientWhereInput = {
    OR: [
      { first_name: { contains: query.search, mode: 'insensitive' } },
      { last_name: { contains: query.search, mode: 'insensitive' } },
    ],
  }
  const options = { page: Number(query.page), limit: Number(query.limit) }

  const [patients, total] = await patientService.findPatients(filter, options)

  const data = await Promise.all(
    patients.map(async (patient) => {
      const [lastVisit, nextAppointment] =
        await patientService.findPatientStats({
          patient_id: patient.id,
        })
      return { ...patient, lastVisit, nextAppointment }
    })
  )

  res.status(200).json({
    success: true,
    data: data,
    total: total,
  })
})

const getPatient = catchAsync(async (req, res) => {
  const { id } = req.params

  const patient = await patientService.findPatient({ id })
  if (!patient) throw new NotFoundError('Patient not found')

  if (patient.image_url) {
    patient.image_url = await awsS3.getPresignedDownloadUrl(patient.image_url)
  }
  delete (patient as any).password

  res.status(200).json({
    success: true,
    data: patient,
  })
})

const createPatient = catchAsync(async (req, res) => {
  const newPatient: CreatePatientSchema = req.body

  const patient = await patientService.findPatient({
    email: newPatient.email,
  })
  if (patient) throw new ValidationError('Patient email already exists')

  newPatient.password = await bcrypt.hash(newPatient.password, 10)

  const savedPatient = await patientService.createPatient(newPatient)

  delete (savedPatient as any).password

  res.status(201).json({
    success: true,
    data: savedPatient,
    message: 'Patient added successfully',
  })
})

const updatePatient = catchAsync(async (req, res) => {
  const { id } = req.params
  const newPatient: UpdatePatientSchema = req.body

  const patient = await patientService.findPatient({
    email: newPatient.email,
  })
  if (patient && patient.id !== id) {
    throw new ValidationError('Patient email already exists')
  }
  if (newPatient.password) {
    newPatient.password = await bcrypt.hash(newPatient.password, 10)
  }

  const updatedPatient = await patientService.updatePatient({ id }, newPatient)
  if (!updatedPatient) throw new NotFoundError('Patient not found')

  delete (updatedPatient as any).password

  res.status(200).json({
    success: true,
    data: updatedPatient,
    message: 'Patient updated successfully',
  })
})

const deletePatient = catchAsync(async (req, res) => {
  const { id } = req.params

  const deletedPatient = await patientService.deletePatient({ id })
  if (!deletedPatient) throw new NotFoundError('Patient not found')

  res.status(200).json({
    success: true,
    message: 'Patient deleted successfully',
  })
})

export default {
  getPatients,
  getPatientsStats,
  searchPatientsByName,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
}
