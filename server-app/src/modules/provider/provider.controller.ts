import bcrypt from 'bcryptjs'
import {
  NotFoundError,
  ValidationError,
} from '../../middlewares/errorHandler.js'
import catchAsync from '../../utils/catchAsync.js'
import providerService, { type ProviderWhereInput } from './provider.service.js'
import type {
  CreateProviderSchema,
  UpdateProviderSchema,
} from './provider.validation.js'

const getProviders = catchAsync(async (req, res) => {
  const { page, limit } = req.query
  const options = { page: Number(page), limit: Number(limit) }

  const providers = await providerService.findProviders({}, options)

  res.status(200).json({
    success: true,
    data: providers,
  })
})

const getProvidersByRoleTitle = catchAsync(async (req, res) => {
  const { role_title } = req.params
  const { page, limit } = req.query
  const options = { page: Number(page), limit: Number(limit) }

  const providers = await providerService.findProviders({ role_title }, options)

  res.status(200).json({
    success: true,
    data: providers,
  })
})

const searchProvidersByName = catchAsync(async (req, res) => {
  const query = req.query

  const filter: ProviderWhereInput = {
    OR: [
      { first_name: { contains: query.search } },
      { last_name: { contains: query.search } },
    ],
  }
  const options = { page: Number(query.page), limit: Number(query.limit) }

  const providers = await providerService.findProviders(filter, options)

  res.status(200).json({
    success: true,
    data: providers,
  })
})

const getProvider = catchAsync(async (req, res) => {
  const { id } = req.params

  const provider = await providerService.findProvider({ id })
  if (!provider) throw new NotFoundError('Provider not found')

  delete (provider as any).password

  res.status(200).json({
    success: true,
    data: provider,
  })
})

const createProvider = catchAsync(async (req, res) => {
  const newProvider: CreateProviderSchema = req.body

  const provider = await providerService.findProvider({
    email: newProvider.email,
  })
  if (provider) throw new ValidationError('Provider email already exists')

  newProvider.password = await bcrypt.hash(newProvider.password, 10)

  const savedProvider = await providerService.createProvider(newProvider)

  delete (savedProvider as any).password

  res.status(201).json({
    success: true,
    data: savedProvider,
    message: 'Provider added successfully',
  })
})

const updateProvider = catchAsync(async (req, res) => {
  const { id } = req.params
  const newProvider: UpdateProviderSchema = req.body

  const provider = await providerService.findProvider({
    email: newProvider.email,
  })
  if (provider && provider.id !== id) {
    throw new ValidationError('Provider email already exists')
  }
  if (newProvider.password) {
    newProvider.password = await bcrypt.hash(newProvider.password, 10)
  }

  const updatedProvider = await providerService.updateProvider(
    { id },
    newProvider
  )
  if (!updatedProvider) throw new NotFoundError('Provider not found')

  delete (updatedProvider as any).password

  res.status(200).json({
    success: true,
    data: updatedProvider,
    message: 'Provider updated successfully',
  })
})

const deleteProvider = catchAsync(async (req, res) => {
  const { id } = req.params

  const deletedProvider = await providerService.deleteProvider({ id })
  if (!deletedProvider) throw new NotFoundError('Provider not found')

  res.status(200).json({
    success: true,
    message: 'Provider deleted successfully',
  })
})

export default {
  getProviders,
  getProvidersByRoleTitle,
  searchProvidersByName,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
}
