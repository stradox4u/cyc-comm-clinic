import { Plus, Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PatientsList from '../../../features/patients/components/patients-list'
import Pagination from '../../../components/ui/pagination'

const AllPatients = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    total: 0,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 sm:w-12 md:w-64 text-black dark:text-white"
              />
            </div>
            <Button onClick={() => navigate('/provider/patients/register')}>
              <Plus className="h-4 w-4 mr-2" />
              New Patient
            </Button>
          </div>
        </div>
        <PatientsList
          searchValue={searchValue}
          pagination={pagination}
          setPagination={setPagination}
        />

        {pagination.total > 0 && (
          <div className="flex justify-center mx-auto">
            <Pagination
              currentPage={pagination.page}
              perPage={pagination.limit}
              total={pagination.total}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default AllPatients
