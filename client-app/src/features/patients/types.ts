import type { CreatePatientSchema } from './schema'

export interface APIResponse<T = unknown> {
  success: true
  message?: string
  data?: T
}

export interface Pagination {
  page: number
  limit: number
}

export type Patient = CreatePatientSchema & {
  id: string
  createdAt: string
  updatedAt: string
}
