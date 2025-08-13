import express from 'express'
import { authenticate, authorize } from '../../middlewares/auth.js'
import { UserType } from '../../types/index.js'
import { ProviderRoleTitle } from '@prisma/client'
import providerController from './provider.controller.js'
import providerValidation from './provider.validation.js'
import validate from '../../middlewares/validate.js'

const router = express.Router()

router.get(
  '/',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  providerController.getProviders
)

router.get(
  '/stats',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  providerController.getProvidersStats
)

router.get(
  '/role-title/:role_title',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  providerController.getProvidersByRoleTitle
)

router.get(
  '/search',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
  providerController.searchProvidersByName
)

router.get(
  '/:id',
  authenticate(UserType.PROVIDER),
  providerController.getProvider
)

router.post(
  '/',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN]),
  validate(providerValidation.createProviderSchema),
  providerController.createProvider
)

router.put(
  '/:id',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN]),
  validate(providerValidation.updateProviderSchema),
  providerController.updateProvider
)

router.delete(
  '/:id',
  authenticate(UserType.PROVIDER),
  authorize([ProviderRoleTitle.ADMIN]),
  providerController.deleteProvider
)

export default router
