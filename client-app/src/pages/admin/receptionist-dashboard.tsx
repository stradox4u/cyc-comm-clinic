import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Clock,
  Phone,
  User,
  Plus,
  Search,
  CheckCircle,
  Users,
  CalendarDays,
  PhoneCall,
  MessageSquare,
  FileText,
  CreditCard,
  Bell,
} from "lucide-react";

const todaysAppointments = [
  {
    id: "A001",
    time: "9:00 AM",
    patient: "Sarah Johnson",
    patientId: "P001",
    type: "Annual Physical",
    provider: "Dr. Martinez",
    status: "Checked In",
    phone: "(555) 123-4567",
    insurance: "Blue Cross",
    copay: "$25",
    notes: "First visit in 2 years",
  },
  {
    id: "A002",
    time: "9:30 AM",
    patient: "Michael Chen",
    patientId: "P002",
    type: "Follow-up",
    provider: "Dr. Kim",
    status: "Scheduled",
    phone: "(555) 234-5678",
    insurance: "Aetna",
    copay: "$30",
    notes: "Blood pressure check",
  },
  {
    id: "A003",
    time: "10:00 AM",
    patient: "Emily Rodriguez",
    patientId: "P003",
    type: "Lab Results",
    provider: "Dr. Martinez",
    status: "No Show",
    phone: "(555) 345-6789",
    insurance: "Cigna",
    copay: "$20",
    notes: "Needs to reschedule",
  },
  {
    id: "A004",
    time: "10:30 AM",
    patient: "Robert Williams",
    patientId: "P004",
    type: "Cardiology",
    provider: "Dr. Kim",
    status: "In Progress",
    phone: "(555) 456-7890",
    insurance: "Medicare",
    copay: "$0",
    notes: "Heart monitoring",
  },
  {
    id: "A005",
    time: "11:00 AM",
    patient: "Lisa Thompson",
    patientId: "P005",
    type: "Physical Therapy",
    provider: "PT Johnson",
    status: "Waiting",
    phone: "(555) 567-8901",
    insurance: "United Healthcare",
    copay: "$35",
    notes: "Knee rehabilitation",
  },
];

const waitingPatients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    checkInTime: "8:55 AM",
    appointmentTime: "9:00 AM",
    provider: "Dr. Martinez",
    waitTime: "25 min",
    status: "Ready",
  },
  {
    id: "P005",
    name: "Lisa Thompson",
    checkInTime: "10:45 AM",
    appointmentTime: "11:00 AM",
    provider: "PT Johnson",
    waitTime: "15 min",
    status: "Waiting",
  },
];

const phoneMessages = [
  {
    id: "M001",
    time: "8:30 AM",
    caller: "John Smith",
    phone: "(555) 111-2222",
    message: "Needs to reschedule appointment for next week",
    priority: "Normal",
    status: "New",
  },
  {
    id: "M002",
    time: "9:15 AM",
    caller: "Mary Davis",
    phone: "(555) 333-4444",
    message: "Question about lab results, urgent",
    priority: "High",
    status: "New",
  },
  {
    id: "M003",
    time: "9:45 AM",
    caller: "Robert Wilson",
    phone: "(555) 555-6666",
    message: "Prescription refill request for blood pressure medication",
    priority: "Normal",
    status: "Completed",
  },
];

const stats = [
  {
    title: "Today's Appointments",
    value: "24",
    change: "3 cancellations",
    icon: CalendarDays,
  },
  { title: "Checked In", value: "8", change: "2 waiting", icon: Users },
  { title: "Phone Calls", value: "12", change: "3 pending", icon: PhoneCall },
  { title: "Messages", value: "5", change: "2 urgent", icon: MessageSquare },
];

export default function ReceptionistDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [newMessage, setNewMessage] = useState({
    caller: "",
    phone: "",
    message: "",
    priority: "Normal",
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "checked in":
        return "default";
      case "scheduled":
        return "secondary";
      case "in progress":
        return "default";
      case "waiting":
        return "outline";
      case "no show":
        return "destructive";
      case "completed":
        return "default";
      default:
        return "outline";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "normal":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleCheckIn = (appointmentId: string) => {
    console.log("Checking in appointment:", appointmentId);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New message:", newMessage);
    setNewMessage({
      caller: "",
      phone: "",
      message: "",
      priority: "Normal",
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Receptionist Dashboard
          </h1>
          <p className="text-muted-foreground">
            Front desk operations and patient management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
          <TabsTrigger value="checkin">Check-In</TabsTrigger>
          <TabsTrigger value="waiting">Waiting Room</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Today's Appointments</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appointment Schedule</CardTitle>
              <CardDescription>
                Complete schedule for {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Copay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todaysAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {appointment.patient}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {appointment.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.provider}</TableCell>
                      <TableCell>{appointment.insurance}</TableCell>
                      <TableCell className="font-medium">
                        {appointment.copay}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeColor(appointment.status)}
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {appointment.status === "Scheduled" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCheckIn(appointment.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Check-In</CardTitle>
              <CardDescription>
                Process patient arrivals and verify information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-search">Search Patient</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="patient-search"
                        placeholder="Enter patient name or ID..."
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="appointment-select">
                      Select Appointment
                    </Label>
                    <Select
                      value={selectedAppointment}
                      onValueChange={setSelectedAppointment}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose appointment" />
                      </SelectTrigger>
                      <SelectContent>
                        {todaysAppointments
                          .filter((apt) => apt.status === "Scheduled")
                          .map((appointment) => (
                            <SelectItem
                              key={appointment.id}
                              value={appointment.id}
                            >
                              {appointment.time} - {appointment.patient}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Insurance Verification</Label>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <CreditCard className="mr-1 h-3 w-3" />
                        Verify Insurance
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-1 h-3 w-3" />
                        Update Info
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete Check-In
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Check-In Checklist</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="id-verified" />
                        <Label htmlFor="id-verified" className="text-sm">
                          Photo ID verified
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="insurance-card" />
                        <Label htmlFor="insurance-card" className="text-sm">
                          Insurance card copied
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="forms-complete" />
                        <Label htmlFor="forms-complete" className="text-sm">
                          Forms completed
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="copay-collected" />
                        <Label htmlFor="copay-collected" className="text-sm">
                          Copay collected
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="contact-updated" />
                        <Label htmlFor="contact-updated" className="text-sm">
                          Contact info updated
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waiting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Room Management</CardTitle>
              <CardDescription>
                Monitor patient wait times and room assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Check-In Time</TableHead>
                    <TableHead>Appointment Time</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitingPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {patient.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.checkInTime}</TableCell>
                      <TableCell>{patient.appointmentTime}</TableCell>
                      <TableCell>{patient.provider}</TableCell>
                      <TableCell>
                        <span
                          className={
                            patient.waitTime.includes("25")
                              ? "text-orange-600 font-medium"
                              : ""
                          }
                        >
                          {patient.waitTime}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            patient.status === "Ready" ? "default" : "secondary"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <User className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Phone Messages</CardTitle>
                <CardDescription>Incoming calls and messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {phoneMessages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{message.caller}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {message.phone}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{message.time}</div>
                          <Badge
                            variant={getPriorityBadgeColor(message.priority)}
                            className="text-xs"
                          >
                            {message.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm mb-2">{message.message}</p>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            message.status === "New"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {message.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Message</CardTitle>
                <CardDescription>Record a new phone message</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="caller-name">Caller Name</Label>
                    <Input
                      id="caller-name"
                      value={newMessage.caller}
                      onChange={(e) =>
                        setNewMessage({ ...newMessage, caller: e.target.value })
                      }
                      placeholder="Enter caller's name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caller-phone">Phone Number</Label>
                    <Input
                      id="caller-phone"
                      type="tel"
                      value={newMessage.phone}
                      onChange={(e) =>
                        setNewMessage({ ...newMessage, phone: e.target.value })
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message-priority">Priority</Label>
                    <Select
                      value={newMessage.priority}
                      onValueChange={(value) =>
                        setNewMessage({ ...newMessage, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message-content">Message</Label>
                    <Textarea
                      id="message-content"
                      value={newMessage.message}
                      onChange={(e) =>
                        setNewMessage({
                          ...newMessage,
                          message: e.target.value,
                        })
                      }
                      placeholder="Enter the message details..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Save Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
              <CardDescription>
                Front desk responsibilities and reminders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <input type="checkbox" id="task1" />
                  <Label htmlFor="task1" className="flex-1">
                    Verify insurance for tomorrow's appointments
                  </Label>
                  <Badge variant="outline">Daily</Badge>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <input type="checkbox" id="task2" defaultChecked />
                  <Label htmlFor="task2" className="flex-1">
                    Send appointment reminders
                  </Label>
                  <Badge variant="default">Completed</Badge>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <input type="checkbox" id="task3" />
                  <Label htmlFor="task3" className="flex-1">
                    Update patient contact information
                  </Label>
                  <Badge variant="secondary">Weekly</Badge>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <input type="checkbox" id="task4" />
                  <Label htmlFor="task4" className="flex-1">
                    Process referral requests
                  </Label>
                  <Badge variant="destructive">Urgent</Badge>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <input type="checkbox" id="task5" />
                  <Label htmlFor="task5" className="flex-1">
                    Reconcile daily payments
                  </Label>
                  <Badge variant="outline">End of Day</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
