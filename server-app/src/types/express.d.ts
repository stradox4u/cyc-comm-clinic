import type { Provider } from '@prisma/client'
import type { AuthTokenPayload } from './index.js'

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload
    }
  }
}
