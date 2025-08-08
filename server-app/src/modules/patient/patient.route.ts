import express from 'express'
import { authenticate, authorize } from '../../middlewares/auth.js'
import { UserType } from '../../types/index.js'
import patientController from './patient.controller.js'
import patientValidation from './patient.validation.js'
import validate from '../../middlewares/validate.js'
import { ProviderRoleTitle } from '@prisma/client'

const router = express.Router()

router.get(
  '/',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  patientController.getPatients
)

router.get(
  '/stats',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  patientController.getPatientsStats
)

router.get(
  '/search',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  patientController.searchPatientsByName
)

router.get(
  '/:id',
  authenticate(UserType.PROVIDER),
  patientController.getPatient
)

router.post(
  '/',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  validate(patientValidation.createPatientSchema),
  patientController.createPatient
)

router.put(
  '/:id',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  validate(patientValidation.updatePatientSchema),
  patientController.updatePatient
)

router.delete(
  '/:id',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  patientController.deletePatient
)

export default router
