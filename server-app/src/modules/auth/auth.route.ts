import express from 'express'
import validate from '../../middlewares/validate.js'
import authController from './auth.controller.js'
import authValidation from './auth.validation.js'
import {
  authenticate,
  authenticateMultipleUser,
} from '../../middlewares/auth.js'
import { UserType } from '../../types/index.js'

const router = express.Router()

router.post(
  '/patient/register',
  validate(authValidation.patientRegisterSchema),
  authController.patientRegister
)

router.post(
  '/patient/login',
  validate(authValidation.loginSchema),
  authController.patientLogin
)

router.post(
  '/patient/verify-email',
  validate(authValidation.verifyEmailSchema),
  authController.patientVerifyEmail
)

router.post(
  '/patient/request-otp',
  validate(authValidation.requestOTPSchema),
  authController.patientRequestOTP
)

router.post(
  '/patient/forgot-password',
  validate(authValidation.forgotPasswordSchema),
  authController.patientForgotPassword
)

router.post(
  '/patient/reset-password',
  validate(authValidation.resetPasswordSchema),
  authController.patientResetPassword
)

router.post(
  '/patient/change-password',
  authenticate(UserType.PATIENT),
  validate(authValidation.changePasswordSchema),
  authController.patientChangePassword
)

router.get(
  '/patient/profile',
  authenticate(UserType.PATIENT),
  authController.patientGetProfile
)

router.put(
  '/patient/profile',
  authenticate(UserType.PATIENT),
  validate(authValidation.patientUpdateProfileSchema),
  authController.patientUpdateProfile
)

router.post(
  '/provider/login',
  validate(authValidation.loginSchema),
  authController.providerLogin
)

router.post(
  '/provider/forgot-password',
  validate(authValidation.forgotPasswordSchema),
  authController.providerForgotPassword
)

router.post(
  '/provider/reset-password',
  validate(authValidation.resetPasswordSchema),
  authController.providerResetPassword
)

router.post(
  '/provider/change-password',
  authenticate(UserType.PROVIDER),
  validate(authValidation.changePasswordSchema),
  authController.providerChangePassword
)

router.get(
  '/provider/profile',
  authenticate(UserType.PROVIDER),
  authController.providerProfile
)

router.get(
  '/generate-url',
  authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
  authController.generateUploadUrl
)

router.post('/logout', authController.logout)

export default router
