import express from 'express'
import { authenticateMultipleUser } from '../../middlewares/auth.js'
import { UserType } from '../../types/index.js'
import userController from './user.controller.js'

const router = express.Router()

router.get(
  '/dashboard',
  authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
  userController.dashboard
)

export default router
