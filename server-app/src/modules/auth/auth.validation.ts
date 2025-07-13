import { PatientGender } from '@prisma/client'
import { z } from 'zod'

const registerPatientSchema = z.object({
  email: z.email('Email is invalid'),
  password: z.string().min(7, 'Password must be minimun of 7 characters'),
  first_name: z.string('First name is invalid').min(2),
  last_name: z.string('Last name is invalid').min(2),
  phone: z.string('Phone number is invalid').min(11).max(11),
  dob: z.iso.datetime('Date of birth is invalid'),
  weight: z.string('Weight is invalid'),
  height: z.string('Height is invalid'),
  address: z.string().min(2, 'Address is invalid'),
  gender: z.enum(PatientGender, 'Gender is invalid'),
  emergency_contact: z.string('Emergency contact is invalid').min(11).max(11),
  blood_group: z.string('Blood group is invalid'),
  allergies: z.array(z.string('Allergies is invalid')),
  insurance_coverage: z.string().nullable(),
  insurance_provider_id: z.uuid().nullable(),
})

export type RegisterPatientSchema = z.infer<typeof registerPatientSchema>

export default {
  registerPatientSchema,
}
