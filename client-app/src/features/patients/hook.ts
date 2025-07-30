import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createPatient,
  getPatient,
  getPatients,
  searchPatientsByName,
} from './api'
import type { CreatePatientSchema } from './schema'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'
import type { APIResponse, Pagination } from './types'
import { toast } from 'sonner'

const usePatients = (query: Pagination) => {
  return useQuery({
    queryFn: () => getPatients(query),
    queryKey: ['patients', query.page],
  })
}

const useSearchPatientsByName = () => {
  return useMutation({
    mutationFn: ({ name, query }: { name: string; query: Pagination }) =>
      searchPatientsByName(name, query),
    mutationKey: ['searchPatients'],
  })
}

const usePatient = (id: string | undefined) => {
  return useQuery({
    queryFn: () => getPatient(id!),
    queryKey: ['patient', id],
    enabled: !!id,
  })
}

const useCreatePatient = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreatePatientSchema) => createPatient(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patient'] })
      toast.success(data.message)
      navigate(`/patients/${data.data.id}`)
    },
    onError: (data: AxiosError<APIResponse>) => {
      toast.error(data.response?.data?.message)
    },
  })
}
export { usePatients, useSearchPatientsByName, usePatient, useCreatePatient }
