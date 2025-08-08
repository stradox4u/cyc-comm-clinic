import { Download, Plus, Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PatientsList from '../../../features/patients/components/patients-list'
import Pagination from '../../../components/ui/pagination'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs'
import { usePatientsStats } from '../../../features/patients/hook'

const AllPatients = () => {
  const navigate = useNavigate()
  const { data: patientsStats } = usePatientsStats()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    total: 0,
  })

  const stats = [
    {
      title: 'Total Patients',
      value: patientsStats?.data?.totalPatients,
      change: 'Overall',
      icon: '👥',
    },
    {
      title: 'Active Patients',
      value: patientsStats?.data?.totalActivePatientsInLastMonth,
      change: 'This month',
      icon: '✅',
    },
    {
      title: 'New Registrations',
      value: patientsStats?.data?.totalRegistrationsInLastMonth,
      change: 'This month',
      icon: '🆕',
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Patients</h1>
          <p className="text-muted-foreground">
            Comprehensive patient management and records
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/provider/patients/register')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recent">Recent Visits</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Directory</CardTitle>
              <CardDescription>
                Complete list of all registered patients with their details and
                status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientsList
                searchValue={searchValue}
                pagination={pagination}
                setPagination={setPagination}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Patients</CardTitle>
              <CardDescription>
                Patients with recent activity or upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Active patients view - filtered content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high-risk">
          <Card>
            <CardHeader>
              <CardTitle>High Risk Patients</CardTitle>
              <CardDescription>
                Patients requiring special attention and monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                High risk patients view - filtered content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
              <CardDescription>
                Patients with recent clinic visits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recent visits view - filtered content would appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
  )
}

export default AllPatients
