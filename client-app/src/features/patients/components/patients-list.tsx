import { useEffect, useState } from 'react'
import type { IPagination, Patient } from '../types'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePatients, useSearchPatientsByName } from '../hook'
import { useDebounce } from '../../../hooks/useDebounce'
import { Skeleton } from '../../../components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import { Card } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { EyeIcon } from 'lucide-react'
import { formatDateIntl } from '../../../lib/utils'

interface Props {
  searchValue: string
  pagination: Required<IPagination>
  setPagination: (pagination: Required<IPagination>) => void
}

const PatientsList = ({ searchValue, pagination, setPagination }: Props) => {
  const [patients, setPatients] = useState<Patient[] | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data: patientsData, isLoading } = usePatients(pagination)
  const { mutate: searchPatientsByName, data: patientsSearchData } =
    useSearchPatientsByName()

  useEffect(() => {
    if (patientsData) {
      setPatients(patientsData?.data)
      setPagination({ ...pagination, total: patientsData?.total })
    }
  }, [patientsData])
  useEffect(() => {
    if (patientsSearchData) setPatients(patientsSearchData?.data)
  }, [patientsSearchData])

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1
    setPagination({ ...pagination, page })
  }, [searchParams.get('page')])

  useDebounce(
    () => {
      if (searchValue || patientsData) {
        const query = { page: 1, limit: pagination.limit }
        searchPatientsByName({ name: searchValue, query })
      }
    },
    1000,
    [searchValue]
  )

  return (
    <div className="my-10">
      <br />
      <Card>
        <Table>
          <TableCaption>A list of your recent patients</TableCaption>
          <TableHeader>
            <TableRow className="py-5">
              <TableHead className="">S/N</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [...Array(20)].map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : patients?.map((patient, index) => (
                  <TableRow key={patient.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="no-wrap">
                      {patient.first_name} {patient.last_name}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {patient.gender === 'MALE' ? 'M' : 'F'}
                      </span>
                    </TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{formatDateIntl(patient.updated_at)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          navigate(`/provider/patients/${patient.id}`)
                        }
                        size="sm"
                      >
                        <EyeIcon /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
export default PatientsList
