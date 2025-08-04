import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Clock, Phone, Mail, User, Search } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import {
  formatDateParts,
  formatPurposeText,
  type Provider,
  type Appointment,
} from "../../lib/type";
import { Skeleton } from "../../components/ui/skeleton";
import { useAuthStore } from "../../store/auth-store";

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [toggle, setToggle] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [providers, setProviders] = useState<Provider[]>();

  // const appointments = [
  //   {
  //     id: 1,
  //     time: "9:00 AM",
  //     patient: "Sarah Johnson",
  //     phone: "(555) 123-4567",
  //     email: "sarah.j@email.com",
  //     type: "Annual Check-up",
  //     provider: "Dr. Smith",
  //     status: "confirmed",
  //     notes: "First visit, new patient",
  //   },
  //   {
  //     id: 2,
  //     time: "9:30 AM",
  //     patient: "Michael Chen",
  //     phone: "(555) 234-5678",
  //     email: "m.chen@email.com",
  //     type: "Follow-up",
  //     provider: "Dr. Davis",
  //     status: "confirmed",
  //     notes: "Blood pressure follow-up",
  //   },
  //   {
  //     id: 3,
  //     time: "10:00 AM",
  //     patient: "Emma Davis",
  //     phone: "(555) 345-6789",
  //     email: "emma.d@email.com",
  //     type: "Vaccination",
  //     provider: "Nurse Johnson",
  //     status: "pending",
  //     notes: "COVID-19 booster",
  //   },
  //   {
  //     id: 4,
  //     time: "10:30 AM",
  //     patient: "Robert Wilson",
  //     phone: "(555) 456-7890",
  //     email: "r.wilson@email.com",
  //     type: "Consultation",
  //     provider: "Dr. Smith",
  //     status: "confirmed",
  //     notes: "Diabetes consultation",
  //   },
  //   {
  //     id: 5,
  //     time: "11:00 AM",
  //     patient: "Lisa Anderson",
  //     phone: "(555) 567-8901",
  //     email: "lisa.a@email.com",
  //     type: "Screening",
  //     provider: "Dr. Davis",
  //     status: "no-show",
  //     notes: "Mammography screening",
  //   },
  // ];

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    type: "",
    provider: "",
    notes: "",
  });

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      `Appointment for ${newAppointment.patientName} has been scheduled successfully.`
    );
    setNewAppointment({
      patientName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      type: "",
      provider: "",
      notes: "",
    });
  };

  const sendReminder = (appointmentId: string, method: "sms" | "email") => {
    const appointment = appointments?.find((apt) => apt.id === appointmentId);
    toast(
      `${method.toUpperCase()} reminder sent to ${appointment?.patient_id}`
    );
  };

  const filteredAppointments =
    appointments?.filter(
      (apt) =>
        apt.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/appointment/appointments/${user?.id}`);
      const result = await res.json();
      if (!result?.success) {
        toast.error(result?.message || "Failed to fetch appointments");
      }
      setAppointments(result?.data ?? []);
      setIsLoading(false);
    };
    fetchAppointments();
  }, [user]);

  useEffect(() => {
    const fetchProviderss = async () => {
      setLoadingProviders(true);
      const res = await fetch(`/api/providers`);
      const result = await res.json();
      if (!result?.success) {
        toast.error(result?.message || "Failed to fetch appointments");
      }
      setProviders(result?.data ?? []);
      setLoadingProviders(false);
    };
    fetchProviderss();
  }, [toggle]);

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
    );
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
            {/* <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button> */}
          </div>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Today's Schedule</TabsTrigger>
            <TabsTrigger value="schedule">Schedule New</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAppointments?.length === 0 ? (
                    <div className="text-center space-y-1">
                      <h1 className="text-lg font-semibold text-muted-foreground">
                        No Appointments Scheduled
                      </h1>
                      <p className="text-sm text-gray-500">
                        There are currently no appointments scheduled for any
                        patients. Please check back later or create a new
                        appointment.
                      </p>
                    </div>
                  ) : (
                    filteredAppointments?.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border border-muted rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold">
                              {
                                formatDateParts(
                                  appointment.schedule.appointment_date
                                ).day
                              }
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 inline mr-1" />
                              30 min
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {appointment?.patient_id}
                              </span>
                              <Badge
                                variant={
                                  appointment.status === "CONFIRMED"
                                    ? "default"
                                    : appointment.status === "SCHEDULED"
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>
                                {appointment.purposes.includes("OTHERS")
                                  ? appointment.other_purpose
                                  : formatPurposeText(
                                      appointment.purposes
                                    )}{" "}
                                {appointment.appointment_providers?.length >
                                  0 && (
                                  <>
                                    with{" "}
                                    {appointment.appointment_providers
                                      .map((ap) => `${ap}`)
                                      .join(", ")}
                                  </>
                                )}
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {appointment?.phone ?? "09034348483"}
                                </span>
                                <span className="flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {appointment?.email ?? "test@gmail.com"}
                                </span>
                              </div>
                              {appointment.notes && (
                                <div className="text-xs italic">
                                  {appointment.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendReminder(appointment.id, "sms")}
                          >
                            SMS
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              sendReminder(appointment.id, "email")
                            }
                          >
                            Email
                          </Button>
                          {appointment.status === "SUBMITTED" &&
                            (toggle ? (
                              <Select
                                onValueChange={(value) => {
                                  console.log("Selected provider ID:", value);
                                  // Optionally set provider here
                                }}
                                disabled={loadingProviders}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={
                                      loadingProviders
                                        ? "Loading..."
                                        : "Select Provider"
                                    }
                                  />
                                </SelectTrigger>

                                <SelectContent>
                                  {loadingProviders ? (
                                    <div className="space-y-2">
                                      <Skeleton className="h-10 w-full" />
                                    </div>
                                  ) : (
                                    providers?.map((pro) => (
                                      <SelectItem key={pro.id} value={pro.id}>
                                        {pro.first_name} {pro.last_name}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Button onClick={() => setToggle(true)} size="sm">
                                Schedule Provider
                              </Button>
                            ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
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
  );
}
