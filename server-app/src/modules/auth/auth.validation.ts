import { PatientGender } from '@prisma/client'
import { z } from 'zod'

const patientRegisterSchema = z.object({
  email: z.email('Email is invalid'),
  password: z.string().min(7, 'Password must be minimun of 7 characters'),
  first_name: z.string('First name is invalid').min(2),
  last_name: z.string('Last name is invalid').min(2),
  phone: z.string('Phone number is invalid').min(11).max(11),
  date_of_birth: z.iso.datetime('Date of birth is invalid'),
  address: z.string().min(2, 'Address is invalid'),
  gender: z.enum(PatientGender, 'Gender is invalid'),
  emergency_contact_name: z.string('Emergency contact name is invalid').min(2),
  emergency_contact_phone: z
    .string('Emergency contact number is invalid')
    .min(11)
    .max(11),
  blood_group: z.string('Blood group is invalid'),
  allergies: z.array(z.string('Allergies is invalid')),
  insurance_coverage: z.string().nullable(),
  insurance_provider_id: z.uuid().nullable(),
})

export type PatientRegisterSchema = z.infer<typeof patientRegisterSchema>

const loginSchema = patientRegisterSchema.pick({
  email: true,
  password: true,
})

export type LoginSchema = z.infer<typeof loginSchema>

const verifyEmailSchema = z.object({
  email: z.email(),
  otp: z.string().min(6).max(6),
})

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>

const requestOTPSchema = z.object({
  email: z.email(),
})

export type RequestOTPSchema = z.infer<typeof requestOTPSchema>

const forgotPasswordSchema = z.object({
  email: z.email(),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

const resetPasswordSchema = z.object({
  email: z.email(),
  password: z.string().min(7),
  otp: z.string().min(6).max(6),
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

const changePasswordSchema = z.object({
  currentPassword: z.string().min(7),
  newPassword: z.string().min(7),
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export default {
  patientRegisterSchema,
  loginSchema,
  verifyEmailSchema,
  requestOTPSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
}
