import { ProviderRoleTitle } from '@prisma/client'
import z from 'zod'

const createProviderSchema = z.object({
  email: z.email('Email is invalid'),
  password: z.string().min(7, 'Password must be minimun of 7 characters'),
  first_name: z.string('First name is invalid').min(2),
  last_name: z.string('Last name is invalid').min(2),
  phone: z.string('Phone number is invalid').min(11).max(11),
  role_title: z.enum(ProviderRoleTitle),
})

export type CreateProviderSchema = z.infer<typeof createProviderSchema>

const updateProviderSchema = createProviderSchema.partial()

export type UpdateProviderSchema = z.infer<typeof updateProviderSchema>

export default {
  createProviderSchema,
  updateProviderSchema,
}
