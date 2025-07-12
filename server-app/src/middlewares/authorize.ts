import type { NextFunction, Request, Response } from 'express'
import { UnauthenticatedError, UnauthorizedError } from './errorHandler.js'
// import { AdminRole } from '@prisma/client'

const authorize = (roles: AdminRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthenticatedError('You need to login first')
    }

    const adminRole = req.user.role

    if (!roles.includes(adminRole)) {
      throw new UnauthorizedError("You don't have the permission for access")
    }
    next()
  }
}

export { authorize }
