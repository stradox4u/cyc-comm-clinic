import { useEffect, useState } from 'react'
import type { Pagination, Patient } from '../types'
import { useSearchParams } from 'react-router-dom'
import { usePatients, useSearchPatientsByName } from '../hook'
import { searchPatientsByName } from '../api'

const PatientsList = () => {
  const [patients, setPatients] = useState<
    (Patient & { _count: { fingerprints: number } })[] | null
  >(null)
  const [searchValue, setSearchValue] = useState('')

  const [searchParams] = useSearchParams()
  const [pagination] = useState<Pagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
  })
  const { data: patientsData, isLoading } = usePatients(pagination)
  const { mutate: searchPatientsByName, data: patientsSearchData } =
    useSearchPatientsByName()

  useEffect(() => {
    if (patientsData) setPatients(patientsData?.data)
  }, [patientsData])
  useEffect(() => {
    if (patientsSearchData) setPatients(patientsSearchData?.data)
  }, [patientsSearchData])

  useEffect(() => {
    pagination.page = Number(searchParams.get('page')) || 1
  }, [searchParams.get('page')])

  return (
    <>
      <div>PatientsList</div>
    </>
  )
}
export default PatientsList
