import API from '../../lib/api'
import type { CreatePatientSchema, UpdatePatientSchema } from './schema'
import type { IPagination } from './types'

const getPatients = async ({ page, limit }: IPagination) => {
  const { data } = await API.get(`/api/patients?page=${page}&limit=${limit}`)
  return data
}

const getPatientsStats = async () => {
  const { data } = await API.get(`/api/patients/stats`)
  return data
}

const searchPatientsByName = async (
  name: string,
  { page, limit }: IPagination
) => {
  const { data } = await API.get(
    `/api/patients/search?search=${name}&page=${page}&limit=${limit}`
  )
  return data
}

const getPatient = async (id: string) => {
  const { data } = await API.get(`/api/patients/${id}`)
  return data
}

const createPatient = async (payload: CreatePatientSchema) => {
  const { data } = await API.post(`/api/patients`, payload)
  return data
}

const updatePatient = async (id: string, payload: UpdatePatientSchema) => {
  const { data } = await API.patch(`/api/patients/${id}`, payload)
  return data
}

const deletePatient = async (id: string) => {
  const { data } = await API.get(`/api/patients/${id}`)
  return data
}

export {
  getPatients,
  getPatientsStats,
  searchPatientsByName,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
}
