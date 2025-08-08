import type { CreateInsuranceProviderSchema } from './schema'

export interface APIResponse<T = unknown> {
  success: true
  message?: string
  data?: T
  total?: number
}

export interface IPagination {
  page: number
  limit: number
  total?: number
}

export type InsuranceProvider = CreateInsuranceProviderSchema & {
  id: string
  created_at: string
  updated_at: string
}
