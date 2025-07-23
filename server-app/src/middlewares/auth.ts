import type { Request, Response, NextFunction } from 'express'
import { UnauthenticatedError, UnauthorizedError } from './errorHandler.js'
import { UserType } from '../types/index.js'
import type { ProviderRoleTitle } from '@prisma/client'

const authenticate = (userType: UserType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user
    if (!user) throw new UnauthenticatedError('You need to login first')

    req.user = user
    next()
  }
}

const authorize = (roleTitles: ProviderRoleTitle[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthenticatedError('You need to login first')
    }

    const adminRole = req.user?.roleTitle

    if (!adminRole || !roleTitles.includes(adminRole)) {
      throw new UnauthorizedError("You don't have the permission for access")
    }
    next()
  }
}

export { authenticate, authorize }
