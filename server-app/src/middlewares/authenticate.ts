// import type { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
// import config from '../config/config.js';
// import { UnauthenticatedError } from './errorHandler.js';

// const authenticate = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.cookies?.accessToken
//     if (!token) throw new UnauthenticatedError('No token provided')

//     const payload = jwt.verify(token, config.jwt.JWT_SECRET);
//     const user = await User.findById(payload.id);

//     if (!user) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// export default authenticate
