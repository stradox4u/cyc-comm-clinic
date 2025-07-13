import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { UnauthenticatedError, UnauthorizedError } from './errorHandler.js'
import authService from '../modules/auth/auth.service.js'
import { UserRole, type AuthTokenPayload } from '../types/index.js'

const authenticate = (roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken
      if (!token) throw new UnauthenticatedError('No token provided')

      const payload = jwt.verify(
        token,
        config.jwt.JWT_SECRET
      ) as AuthTokenPayload

      if (!roles.includes(payload.role)) {
        throw new UnauthorizedError('Access denied')
      }

      let user
      if (payload.role === UserRole.PATIENT) {
        user = await authService.findPatient({ id: payload.id })
      } else if (payload.role === UserRole.PROVIDER) {
        user = await authService.findProvider({ id: payload.id })
      }

      if (!user) {
        throw new UnauthorizedError('Access denied')
      }

      next()
    } catch (err) {
      throw new UnauthenticatedError('Invalid or expired token')
    }
  }
}

export default authenticate
