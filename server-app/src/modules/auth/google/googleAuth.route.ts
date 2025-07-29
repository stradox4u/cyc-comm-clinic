import express from 'express'
import { authenticate } from '../../../middlewares/auth.js'
import { UserType } from '../../../types/index.js'
import authController from './googleAuth.controller.js'

const router = express.Router()

router.get('/', authenticate(UserType.PATIENT), authController.getAuthUrl)

router.get(
  '/callback',
  authenticate(UserType.PATIENT),
  authController.handleCallback
)

export default router
