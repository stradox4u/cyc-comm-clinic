import API from '../../lib/api'
import type {
  CreateInsuranceProviderSchema,
  UpdateInsuranceProviderSchema,
} from './schema'
import type { IPagination } from './types'

const getInsuranceProviders = async ({ page, limit }: IPagination) => {
  const { data } = await API.get(
    `/api/insurance-providers?page=${page}&limit=${limit}`
  )
  return data
}

const getInsuranceProvider = async (id: string) => {
  const { data } = await API.get(`/api/insurance-providers/${id}`)
  return data
}

const createInsuranceProvider = async (
  payload: CreateInsuranceProviderSchema
) => {
  const { data } = await API.post(`/api/insurance-providers`, payload)
  return data
}

const updateInsuranceProvider = async (
  id: string,
  payload: UpdateInsuranceProviderSchema
) => {
  const { data } = await API.patch(`/api/insurance-providers/${id}`, payload)
  return data
}

const deleteInsuranceProvider = async (id: string) => {
  const { data } = await API.get(`/api/insurance-providers/${id}`)
  return data
}

export {
  getInsuranceProviders,
  getInsuranceProvider,
  createInsuranceProvider,
  updateInsuranceProvider,
  deleteInsuranceProvider,
}
