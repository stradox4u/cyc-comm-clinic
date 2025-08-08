import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createPatient,
  getPatient,
  getPatients,
  getPatientsStats,
  searchPatientsByName,
} from './api'
import type { CreatePatientSchema } from './schema'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'
import type { APIResponse, IPagination } from './types'
import { toast } from 'sonner'

const usePatients = (query: IPagination) => {
  return useQuery({
    queryFn: () => getPatients(query),
    queryKey: ['patients', query.page],
  })
}

const usePatientsStats = () => {
  return useQuery({
    queryFn: () => getPatientsStats(),
    queryKey: ['patients-stats'],
  })
}

const useSearchPatientsByName = () => {
  return useMutation({
    mutationFn: ({ name, query }: { name: string; query: IPagination }) =>
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
      navigate(`/provider/patients/${data.data.id}`)
    },
    onError: (data: AxiosError<APIResponse>) => {
      toast.error(data.response?.data?.message)
    },
  })
}
export {
  usePatients,
  usePatientsStats,
  useSearchPatientsByName,
  usePatient,
  useCreatePatient,
}
