import type { CreatePatientSchema } from './schema'

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

export type Patient = CreatePatientSchema & {
  id: string
  image_url?: string
  has_calendar_access?: boolean
  created_at: string
  updated_at: string
}
