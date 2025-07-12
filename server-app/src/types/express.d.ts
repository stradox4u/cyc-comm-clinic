import type { Provider } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: Provider
    }
  }
}
