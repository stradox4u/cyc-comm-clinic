import express from 'express'
import validate from '../../middlewares/validate.js'
import { authenticate, authorize } from '../../middlewares/auth.js'
import { UserType } from '../../types/index.js'
import insuranceProviderController from './insuranceProvider.controller.js'
import insuranceProviderValidation from './insuranceProvider.validation.js'
import { ProviderRoleTitle } from '@prisma/client'

const router = express.Router()

router.get('/', insuranceProviderController.getInsuranceProviders)

router.get('/:id', insuranceProviderController.getInsuranceProvider)

router.post(
  '/',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN]),
  validate(insuranceProviderValidation.createInsuranceProviderSchema),
  insuranceProviderController.createInsuranceProvider
)

router.put(
  '/:id',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN]),
  validate(insuranceProviderValidation.updateInsuranceProviderSchema),
  insuranceProviderController.updateInsuranceProvider
)

router.delete(
  '/:id',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN]),
  insuranceProviderController.deleteInsuranceProvider
)

export default router
