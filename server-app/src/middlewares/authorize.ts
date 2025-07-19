// import type { NextFunction, Request, Response } from 'express'
// import { UnauthenticatedError, UnauthorizedError } from './errorHandler.js'
// import { ProviderRoleTitle } from '@prisma/client'

// const authorize = (roleTitles: ProviderRoleTitle[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       throw new UnauthenticatedError('You need to login first')
//     }

//     const adminRole = req.user.role_title

//     if (!roleTitles.includes(adminRole)) {
//       throw new UnauthorizedError("You don't have the permission for access")
//     }
//     next()
//   }
// }

// export { authorize }
