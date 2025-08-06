import z from 'zod'

const createInsuranceProviderSchema = z.object({
  name: z.string('Name is invalid'),
  description: z.string('Description is invalid'),
})

export type CreateInsuranceProviderSchema = z.infer<
  typeof createInsuranceProviderSchema
>

const updateInsuranceProviderSchema = z.object({
  name: z.string('Name is invalid'),
  description: z.string('Description is invalid'),
})

export type UpdateInsuranceProviderSchema = z.infer<
  typeof updateInsuranceProviderSchema
>

export { createInsuranceProviderSchema, updateInsuranceProviderSchema }
