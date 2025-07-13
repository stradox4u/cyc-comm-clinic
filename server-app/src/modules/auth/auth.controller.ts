import bcrypt from 'bcryptjs'
import { ValidationError } from '../../middlewares/errorHandler.js'
import catchAsync from '../../utils/catchAsync.js'
import authService from './auth.service.js'
import type { RegisterPatientSchema } from './auth.validation.js'

const registerPatient = catchAsync(async (req, res) => {
  let newPatient: RegisterPatientSchema = req.body

  const patient = await authService.findPatient({ email: newPatient.email })
  if (patient) throw new ValidationError('This email already exists')

  newPatient.password = await bcrypt.hash(newPatient.password, 10)

  await authService.createPatient(newPatient)

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
  })
})

export default {
  registerPatient,
}
