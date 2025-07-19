import express from 'express'
import validate from '../../middlewares/validate.js'
import authController from './auth.controller.js'
import authValidation from './auth.validation.js'
import authenticate from '../../middlewares/authenticate.js'
import { UserType } from '../../types/index.js'

const router = express.Router()

router.post(
  '/patient/register',
  validate(authValidation.patientRegisterSchema),
  authController.patientRegister
)

router.post(
  '/patient/login',
  validate(authValidation.patientLoginSchema),
  authController.patientLogin
)

router.get(
  '/patient/profile',
  authenticate(UserType.PATIENT),
  authController.patientProfile
)

router.post(
  '/provider/login',
  validate(authValidation.providerLoginSchema),
  authController.providerLogin
)

router.get(
  '/provider/profile',
  authenticate(UserType.PROVIDER),
  authController.providerProfile
)

router.post('/logout', authController.logout)

export default router
