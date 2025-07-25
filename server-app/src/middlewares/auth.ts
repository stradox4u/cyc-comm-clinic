import type { Request, Response, NextFunction } from 'express'
import { UnauthenticatedError, UnauthorizedError } from './errorHandler.js'
import { UserType } from '../types/index.js'
import type { ProviderRoleTitle } from '@prisma/client'
import { PROVIDER_ROLES } from '../types/index.js'

const authenticate = (userType: UserType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user
    if (!user) throw new UnauthenticatedError('You need to login first')

    req.user = user
    next()
  }
}

const authorize = (roleTitles: ProviderRoleTitle[] = PROVIDER_ROLES) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthenticatedError('You need to login first')
    }

    const providerRole = req.user?.roleTitle

    if (!providerRole || !roleTitles.includes(providerRole)) {
      throw new UnauthorizedError("You don't have the permission for access")
    }
    next()
  }
}

const authenticateMultipleUser = (allowedUsers: UserType[]) => (
  req: Request, res: Response, next: NextFunction
) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Not authenticated' });
  if (!allowedUsers.includes(user.type)) return res.status(403).json({ message: 'Forbidden' });
  next();
}

export { authenticate, authorize, authenticateMultipleUser }
