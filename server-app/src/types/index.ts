import type { ProviderRoleTitle } from '@prisma/client'

export type UserPayload = {
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
}
