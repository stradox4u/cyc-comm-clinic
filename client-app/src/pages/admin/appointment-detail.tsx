import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Badge } from '../../components/ui/badge'
import { Textarea } from '../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import { Separator } from '../../components/ui/separator'
import {
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Save,
  CheckCircle,
  Printer,
  Stethoscope,
  Activity,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import API from '../../lib/api'

// Mock appointment data - in real app, this would come from API

const statusOptions = [
  'Scheduled',
  'Submitted',
  'Confirmed',
  'Checked_In',
  'Completed',
  'Cancelled',
  'No_Show',
  'Rescheduled',
  'Attending',
].map((status) => status.toUpperCase())

const AppointmentDetail = () => {
  const { id } = useParams()

  const fetchAppointment = async (id: string) => {
    const { data } = await API.get(`/api/appointment/${id}`)

    if (!data || !data.success) {
      toast.error(data.message || 'Failed to fetch appointment')
      return
    }
    setStatus(data.data.status)
    setProviderId(data.data.appointment_providers[0]?.provider_id)
    return data.data
  }
  const {
    data: appointment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => fetchAppointment(id!),
    enabled: !!id,
  })

  const [status, setStatus] = useState(appointment?.status)
  const [providerId, setProviderId] = useState()

  console.log(status)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default'
      case 'attending':
        return 'secondary'
      case 'scheduled':
        return 'secondary'
      case 'checked in':
        return 'default'
      case 'in progress':
        return 'default'
      case 'completed':
        return 'default'
      case 'cancelled':
        return 'destructive'
      case 'no show':
        return 'destructive'
      case 'rescheduled':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const fetchProvider = async (providerId: string) => {
    const { data } = await API.get(`/api/providers/${providerId}`)

    if (!data?.success) {
      throw new Error('Failed to fetch provider')
    }

    return data.data
  }

  const { data: provider } = useQuery({
    queryKey: ['provider', providerId],
    queryFn: () => fetchProvider(providerId!),
    enabled: !!providerId, // prevents firing if ID is undefined
  })

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Optionally, update in d
      const { data } = await API.patch(`/api/appointment/${appointment.id}`, {
        status: newStatus,
      })

      if (!data || !data.success) {
        toast.error(data.message)
        return
      }

      setStatus(newStatus)
      toast.success('Appointment status updated')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update status')
    }
  }

  useEffect(() => {
    if (status) {
      handleStatusChange(status)
    }
  }, [status])

  const handleCheckIn = async (appointmentId: string) => {
    try {
      const { data } = await API.patch(`/api/appointment/${appointmentId}`, {
        status: 'CHECKED_IN',
      })

      if (!data || !data.success) {
        toast.error(data?.message || 'Failed to check in appointment.')
        return
      }

      toast.success('Patient successfully checked in.')
      setStatus('CHECKED_IN')
    } catch (error) {
      console.error('Check-in error:', error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred during check-in.'
      )
      return null
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{(error as Error).message}</div>

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Appointments
          </Button> */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Appointment Details
            </h1>
            <p className="text-muted-foreground">
              {appointment?.patient?.first_name} •{' '}
              {appointment?.schedule?.appointment_date
                ? format(
                    new Date(appointment.schedule.appointment_date),
                    'EEE dd'
                  )
                : 'N/A'}{' '}
              at {appointment?.schedule?.appointment_time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Status and Quick Actions */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-4">
          <Badge variant={getStatusColor(status)} className="text-sm">
            {status}
          </Badge>
          {appointment?.checkedIn && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Checked in at {appointment?.checkedInTime}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!appointment?.checkedIn && appointment?.status !== 'Completed' && (
            <Button onClick={() => handleCheckIn(appointment?.id)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Check In Patient
            </Button>
          )}
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Appointment Details</TabsTrigger>
          <TabsTrigger value="patient">Patient Information</TabsTrigger>
          <TabsTrigger value="vitals">Vitals & Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Appointment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Date:</span>
                  <span>
                    {new Date(
                      appointment?.schedule.appointment_date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Time:</span>
                  <span>{appointment?.schedule.appointment_time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Type:</span>
                  <span>
                    {appointment?.purposes?.map((status: string) =>
                      status
                        .toLowerCase()
                        .split('_')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')
                    )}
                  </span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <span className="text-sm font-medium">Reason for Visit:</span>
                  <p className="text-sm text-muted-foreground">
                    {appointment?.reason}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Provider:</span>
                  <span>{provider?.first_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Role:</span>
                  <span className="lowercase">{provider?.role_title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Phone:</span>
                  <span>{provider?.phone}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <span className="text-sm font-medium">Clinical Notes:</span>

                  <p className="text-sm text-muted-foreground">
                    {appointment?.soap_note}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patient" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Patient ID:</span>
                    <span>{appointment?.patient_id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Full Name:</span>
                    <span>
                      {appointment?.patient?.first_name}{' '}
                      {appointment?.patient?.last_name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Date of Birth:</span>
                    <span>
                      {new Date(
                        appointment?.patient?.date_of_birth
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {appointment?.patient?.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {appointment?.patient?.email}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Address:</span>
                    <p className="text-sm text-muted-foreground flex ">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5" />
                      {appointment?.patient?.address}
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-y-2">
                    <span className="text-sm font-medium">Insurance:</span>
                    <span>{appointment?.patient?.insurance_coverage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Emergency Contact:
                    </span>
                    <p className="text-sm text-muted-foreground">
                      {appointment?.patient?.emergency_contact_name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Gender:</span>
                    <p className="text-sm text-muted-foreground">
                      {appointment?.patient?.gender}
                    </p>
                  </div>
                  <div className="flex justify-between items-center space-y-2">
                    <span className="text-sm font-medium">Blood Group:</span>
                    <p className="text-sm text-muted-foreground">
                      {appointment?.patient?.blood_group}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Vital Signs
                </CardTitle>
                <CardDescription>
                  {appointment?.vitals?.created_at
                    ? `Recorded at ${new Date(
                        appointment.vitals.created_at
                      ).toLocaleDateString()}`
                    : 'No vitals recorded yet'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp">Blood Pressure</Label>
                    <Input
                      id="bp"
                      value={appointment?.vitals?.blood_pressure}
                      placeholder="120/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hr">Heart Rate</Label>
                    <Input
                      id="hr"
                      value={appointment?.vitals?.heart_rate}
                      placeholder="72 bpm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temp">Temperature</Label>
                    <Input
                      id="temp"
                      value={appointment?.vitals?.temperature}
                      placeholder="98.6°C"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={appointment?.vitals?.weight}
                      placeholder="75kg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={appointment?.vitals?.height}
                    placeholder="5'6 Inches"
                  />
                </div>
                <Button disabled={appointment?.vitals} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Record Vitals
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Clinical Notes
                </CardTitle>
              </CardHeader>
              {appointment?.soap_note?.length === 0 ? (
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chief-complaint">Chief Complaint</Label>
                    <Textarea
                      id="chief-complaint"
                      placeholder="Patient's main concern or reason for visit..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assessment">Assessment</Label>
                    <Textarea
                      id="assessment"
                      placeholder="Clinical assessment and findings..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">Treatment Plan</Label>
                    <Textarea
                      id="plan"
                      placeholder="Treatment plan and follow-up instructions..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Notes
                  </Button>
                </CardContent>
              ) : (
                <></>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AppointmentDetail
