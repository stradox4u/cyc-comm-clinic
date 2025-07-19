import type { UserPayload } from './index.ts'

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload
  }
}
