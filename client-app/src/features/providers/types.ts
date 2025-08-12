import type { CreateProviderSchema } from './schema'

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

export type Provider = CreateProviderSchema & {
  id: string
  created_at: string
  updated_at: string
}

export const PROVIDER_ROLES = [
  'ADMIN',
  'GENERAL_PRACTIONER',
  'NURSE',
  'GYNAECOLOGIST',
  'LAB_TECHNICIAN',
  'RECEPTIONIST',
  'PAEDIATRICIAN',
  'PHARMACIST',
]
