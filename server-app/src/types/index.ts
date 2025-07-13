export type AuthTokenPayload = {
  id: string
  role: UserRole
}

export enum UserRole {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
}
