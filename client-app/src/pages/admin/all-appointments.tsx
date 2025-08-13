import type React from 'react'
import { useEffect, useState } from 'react'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

import { Textarea } from '../../components/ui/textarea'
import { toast } from 'sonner'
import { type Provider, type Appointment } from '../../lib/type'
import { Skeleton } from '../../components/ui/skeleton'
import { useAuthStore } from '../../store/auth-store'

import AppointmentList from '../../components/appointment-list'
import { Search } from 'lucide-react'

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProviders, setLoadingProviders] = useState(false)

  const [appointments, setAppointments] = useState<Appointment[]>()

  const [toggle, setToggle] = useState(false)
  const user = useAuthStore((state) => state.user)
  const [providers, setProviders] = useState<Provider[]>()
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(
    null
  )
  const adminRole = user?.role_title === 'ADMIN'
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    type: '',
    provider: '',
    notes: '',
  })

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(
      `Appointment for ${newAppointment.patientName} has been scheduled successfully.`
    )
    setNewAppointment({
      patientName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      type: '',
      provider: '',
      notes: '',
    })
  }

  const sendReminder = (appointmentId: string, method: 'sms' | 'email') => {
    const appointment = appointments?.find((apt) => apt.id === appointmentId)
    toast(`${method.toUpperCase()} reminder sent to ${appointment?.patient}`)
  }

  const filteredAppointments = appointments?.filter((apt) => {
    const patientName =
      `${apt.patient.first_name} ${apt.patient.last_name}`.toLowerCase()

    return (
      apt.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientName.includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const fetchAppointments = async () => {
    setIsLoading(true)
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment/appointments`)
    const result = await res.json()
    if (!result?.success) {
      toast.error(result?.message || 'Failed to fetch appointments')
    }
    console.log(result?.data)

    setAppointments(result?.data ?? [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [user])

  useEffect(() => {
    const fetchProviders = async () => {
      setLoadingProviders(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/providers`)
      const result = await res.json()
      if (!result?.success) {
        toast.error(result?.message || 'Failed to fetch appointments')
      }
      setProviders(result?.data ?? [])
      setLoadingProviders(false)
    }
    if (user?.role_title === 'ADMIN') {
      fetchProviders()
    }
  }, [toggle, user?.role_title])

  const handleAssignProvider = async (
    providerId: string,
    appointmentId: string
  ) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/provider/appointment/assign-provider`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          provider_id: providerId,
        }),
      })

      const result = await res.json()

      if (!result.success) {
        toast.error(result.message || 'Failed to assign provider')
      } else {
        toast.success('Provider assigned successfully')
        setToggle(false)
        await fetchAppointments()
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-6">
        {[1, 2].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Appointment Management
          </h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Today's Schedule</TabsTrigger>
            <TabsTrigger value="schedule">Schedule New</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <AppointmentList
              filteredAppointments={filteredAppointments}
              providers={providers}
              adminRole={adminRole}
              handleAssignProvider={handleAssignProvider}
              loadingProviders={loadingProviders}
              selectedProviderId={selectedProviderId}
              sendReminder={sendReminder}
              setSelectedProviderId={setSelectedProviderId}
              setToggle={setToggle}
              toggle={toggle}
            />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schedule New Appointment</CardTitle>
                <CardDescription>
                  Book a new appointment for a patient
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleScheduleAppointment}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name *</Label>
                      <Input
                        id="patientName"
                        value={newAppointment.patientName}
                        onChange={(e) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            patientName: e.target.value,
                          }))
                        }
                        placeholder="Enter patient name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={newAppointment.phone}
                        onChange={(e) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newAppointment.email}
                        onChange={(e) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="patient@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentType">
                        Appointment Type *
                      </Label>
                      <Select
                        value={newAppointment.type}
                        onValueChange={(value) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            type: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="check-up">
                            Annual Check-up
                          </SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="consultation">
                            Consultation
                          </SelectItem>
                          <SelectItem value="vaccination">
                            Vaccination
                          </SelectItem>
                          <SelectItem value="screening">Screening</SelectItem>
                          <SelectItem value="urgent">Urgent Care</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Select
                        value={newAppointment.time}
                        onValueChange={(value) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            time: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                          <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                          <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                          <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider *</Label>
                      <Select
                        value={newAppointment.provider}
                        onValueChange={(value) =>
                          setNewAppointment((prev) => ({
                            ...prev,
                            provider: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                          <SelectItem value="Dr. Davis">Dr. Davis</SelectItem>
                          <SelectItem value="Dr. Wilson">Dr. Wilson</SelectItem>
                          <SelectItem value="Nurse Johnson">
                            Nurse Johnson
                          </SelectItem>
                          <SelectItem value="Nurse Brown">
                            Nurse Brown
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Any special notes or requirements for this appointment"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                    <Button type="submit">Schedule Appointment</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Reminder Settings</CardTitle>
                  <CardDescription>
                    Configure automatic appointment reminders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>SMS Reminders</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">24 hours before</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">2 hours before</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email Reminders</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">48 hours before</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">24 hours before</span>
                        <Badge variant="secondary">Inactive</Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Update Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reminder Statistics</CardTitle>
                  <CardDescription>
                    Performance metrics for appointment reminders
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SMS Delivery Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Open Rate</span>
                      <span className="font-medium">76.8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">No-Show Reduction</span>
                      <span className="font-medium text-green-600">-23%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reminders Sent Today</span>
                      <span className="font-medium">47</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
