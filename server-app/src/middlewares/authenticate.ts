import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { UnauthenticatedError, UnauthorizedError } from './errorHandler.js'
import authService from '../modules/auth/auth.service.js'
import { UserType, type AuthTokenPayload } from '../types/index.js'

const authenticate = (userType: UserType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken
      if (!token) throw new UnauthenticatedError('No token provided')

      const payload = jwt.verify(
        token,
        config.jwt.ACCESS_TOKEN_SECRET
      ) as AuthTokenPayload

      if (userType !== payload.userType) {
        throw new UnauthorizedError('Access denied')
      }

      let user
      if (payload.userType === UserType.PATIENT) {
        user = await authService.findPatient({ id: payload.sub })
      } else if (payload.userType === UserType.PROVIDER) {
        user = await authService.findProvider({ id: payload.sub })
      }

      if (!user) {
        throw new UnauthorizedError('Access denied')
      }

      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default authenticate
