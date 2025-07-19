import type { ProviderRoleTitle } from '@prisma/client'

export type AuthTokenPayload = {
  sub: string
  tokenType: AuthTokenType
  userType: UserType
  providerRoleTitle?: ProviderRoleTitle
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

export enum AuthTokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export interface AuthTokenResponse {
  access: TokenResponse
  refresh: TokenResponse
}

export interface TokenResponse {
  token: string
  expires: number
}
