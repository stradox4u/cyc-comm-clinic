import { Plus, Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProvidersList from '../../../features/providers/components/providers-list'
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
import { useProvidersStats } from '../../../features/providers/hook'

const AllProviders = () => {
  const navigate = useNavigate()
  const { data: providersStats } = useProvidersStats()
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pagination, setPagination] = useState({
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    total: 0,
  })

  const stats = [
    {
      title: 'Total Providers',
      value: providersStats?.data?.totalProviders,
      change: 'Overall',
      icon: '👥',
    },
    {
      title: 'Active Providers',
      value: providersStats?.data?.totalActiveProvidersInLastMonth,
      change: 'This month',
      icon: '✅',
    },
    {
      title: 'New Providers',
      value: providersStats?.data?.totalRegistrationsInLastMonth,
      change: 'This month',
      icon: '🆕',
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Providers Management</h1>
          <p className="text-muted-foreground">
            Comprehensive provider management and records
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" onClick={() => navigate('/provider/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Provider
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
            <TabsTrigger value="all">All Providers</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search providers..."
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
              <CardTitle>Provider Directory</CardTitle>
              <CardDescription>
                Complete list of all registered providers with their details and
                status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProvidersList
                searchValue={searchValue}
                pagination={pagination}
                setPagination={setPagination}
              />
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

export default AllProviders
