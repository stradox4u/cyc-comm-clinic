import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createInsuranceProvider,
  getInsuranceProvider,
  getInsuranceProviders,
} from './api'
import type { CreateInsuranceProviderSchema } from './schema'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'
import type { APIResponse, IPagination } from './types'
import { toast } from 'sonner'

const useInsuranceProviders = (query: IPagination) => {
  return useQuery({
    queryFn: () => getInsuranceProviders(query),
    queryKey: ['insuranceProviders', query.page],
  })
}

const useInsuranceProvider = (id: string | undefined) => {
  return useQuery({
    queryFn: () => getInsuranceProvider(id!),
    queryKey: ['insuranceProvider', id],
    enabled: !!id,
  })
}

const useCreateInsuranceProvider = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateInsuranceProviderSchema) =>
      createInsuranceProvider(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['insuranceProvider'] })
      toast.success(data.message)
      navigate(`/insurance-providers/${data.data.id}`)
    },
    onError: (data: AxiosError<APIResponse>) => {
      toast.error(data.response?.data?.message)
    },
  })
}
export {
  useInsuranceProviders,
  useInsuranceProvider,
  useCreateInsuranceProvider,
}
