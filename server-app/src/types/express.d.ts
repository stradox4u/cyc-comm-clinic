import type { Patient, Provider } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: Patient | Provider
    }
  }
}
