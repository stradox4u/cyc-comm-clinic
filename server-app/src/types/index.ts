import type { ProviderRoleTitle } from '@prisma/client'

export type SessionPayload = {
  id: string
  type: UserType
  roleTitle?: ProviderRoleTitle
}

export enum UserType {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  total?: number
}

export const PROVIDER_ROLES: ProviderRoleTitle[] = [
  'ADMIN',
  'GENERAL_PRACTIONER',
  'NURSE',
  'GYNAECOLOGIST',
  'LAB_TECHNICIAN',
  'RECEPTIONIST',
  'PAEDIATRICIAN',
  'PHARMACIST',
]
