import { NotFoundError } from '../../middlewares/errorHandler.js'
import catchAsync from '../../utils/catchAsync.js'
import insuranceProviderService from './insuranceProvider.service.js'
import type {
  CreateInsuranceProviderSchema,
  UpdateInsuranceProviderSchema,
} from './insuranceProvider.validation.js'

const getInsuranceProviders = catchAsync(async (req, res) => {
  const { page, limit } = req.query
  const options = { page: Number(page), limit: Number(limit) }

  const insuranceProviders =
    await insuranceProviderService.findInsuranceProviders({}, options)

  res.status(200).json({
    success: true,
    data: insuranceProviders,
  })
})

const getInsuranceProvider = catchAsync(async (req, res) => {
  const { id } = req.params

  const insuranceProvider =
    await insuranceProviderService.findInsuranceProvider({ id })
  if (!insuranceProvider) {
    throw new NotFoundError('Insurance provider not found')
  }

  res.status(200).json({
    success: true,
    data: insuranceProvider,
  })
})

const createInsuranceProvider = catchAsync(async (req, res) => {
  const newInsuranceProvider: CreateInsuranceProviderSchema = req.body

  const savedInsuranceProvider =
    await insuranceProviderService.createInsuranceProvider(newInsuranceProvider)

  res.status(201).json({
    success: true,
    data: savedInsuranceProvider,
    message: 'Insurance provider created successfully',
  })
})

const updateInsuranceProvider = catchAsync(async (req, res) => {
  const { id } = req.params
  const newInsuranceProvider: UpdateInsuranceProviderSchema = req.body

  const updatedInsuranceProvider =
    await insuranceProviderService.updateInsuranceProvider(
      { id },
      newInsuranceProvider
    )
  if (!updatedInsuranceProvider) {
    throw new NotFoundError('Insurance provider not found')
  }

  res.status(200).json({
    success: true,
    data: updatedInsuranceProvider,
    message: 'Insurance provider updated successfully',
  })
})

const deleteInsuranceProvider = catchAsync(async (req, res) => {
  const { id } = req.params

  const deletedInsuranceProvider =
    await insuranceProviderService.deleteInsuranceProvider({ id })

  res.status(200).json({
    success: true,
    data: deletedInsuranceProvider,
    message: 'Insurance provider deleted successfully',
  })
})

export default {
  getInsuranceProviders,
  getInsuranceProvider,
  createInsuranceProvider,
  updateInsuranceProvider,
  deleteInsuranceProvider,
}
