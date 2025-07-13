import express from 'express'
import validate from '../../middlewares/validate.js'
import authController from './auth.controller.js'
import authValidation from './auth.validation.js'

const router = express.Router()

router.post(
  '/patient/register',
  validate(authValidation.registerPatientSchema),
  authController.registerPatient
)

export default router
