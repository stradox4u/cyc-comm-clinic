import bcrypt from 'bcryptjs'
import {
  NotFoundError,
  ValidationError,
} from '../../middlewares/errorHandler.js'
import catchAsync from '../../utils/catchAsync.js'
import authService from './auth.service.js'
import type {
  PatientLoginSchema,
  PatientRegisterSchema,
  ProviderLoginSchema,
} from './auth.validation.js'
import { UserType } from '../../types/index.js'
import { cookieConfig, generateAuthTokens } from './auth.util.js'

const patientRegister = catchAsync(async (req, res) => {
  let newPatient: PatientRegisterSchema = req.body

  const patient = await authService.findPatient({ email: newPatient.email })
  if (patient) throw new ValidationError('This email already exists')

  newPatient.password = await bcrypt.hash(newPatient.password, 10)

  await authService.createPatient(newPatient)

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
  })
})

const patientLogin = catchAsync(async (req, res) => {
  let newPatient: PatientLoginSchema = req.body

  const patient = await authService.findPatient({ email: newPatient.email })
  if (!patient) throw new ValidationError('Invalid credentials')

  const isMatch = await bcrypt.compare(newPatient.password, patient.password)
  if (!isMatch) throw new ValidationError('Invalid credentials')

  const { access, refresh } = generateAuthTokens(patient.id, UserType.PATIENT)

  res.cookie('accessToken', access.token, cookieConfig(access.expires))
  res.cookie('refreshToken', refresh.token, cookieConfig(refresh.expires))

  delete (patient as any).password

  res.status(200).json({
    success: true,
    data: patient,
    message: 'Login successful',
  })
})

const patientProfile = catchAsync(async (req, res) => {
  const patientId = req.user?.id

  const patient = await authService.findPatient({ id: patientId })
  if (!patient) throw new NotFoundError('User not found')

  delete (patient as any).password

  res.status(200).json({
    success: true,
    data: patient,
  })
})

const providerLogin = catchAsync(async (req, res) => {
  let newProvider: ProviderLoginSchema = req.body

  const provider = await authService.findProvider({ email: newProvider.email })
  if (!provider) throw new ValidationError('Invalid credentials')

  const isMatch = await bcrypt.compare(newProvider.password, provider.password)
  if (!isMatch) throw new ValidationError('Invalid credentials')

  const { access, refresh } = generateAuthTokens(provider.id, UserType.PROVIDER)

  res.cookie('accessToken', access.token, cookieConfig(access.expires))
  res.cookie('refreshToken', refresh.token, cookieConfig(refresh.expires))

  delete (provider as any).password

  res.status(200).json({
    success: true,
    data: provider,
    message: 'Login successful',
  })
})

const providerProfile = catchAsync(async (req, res) => {
  const providerId = req.user?.id

  const provider = await authService.findProvider({ id: providerId })
  if (!provider) throw new NotFoundError('User not found')

  delete (provider as any).password

  res.status(200).json({
    success: true,
    data: provider,
  })
})

const logout = catchAsync((req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  })
})

export default {
  patientRegister,
  patientLogin,
  patientProfile,
  providerLogin,
  providerProfile,
  logout,
}
