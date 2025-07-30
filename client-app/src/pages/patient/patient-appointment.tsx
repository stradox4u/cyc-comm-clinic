import { Search, Plus, ArrowLeft, CheckCircle, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentPurposes,
  appointmentSchema,
  getWeekdays,
  timeSlots,
  type AppointmentFormData,
} from "../../lib/schema";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const upcomingAppointments = [
  {
    id: 1,
    date: "2024-01-25",
    time: "10:00 AM",
    provider: "Dr. Smith",
    type: "Annual Check-up",
    location: "Main Clinic",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2024-02-10",
    time: "2:30 PM",
    provider: "Dr. Johnson",
    type: "Follow-up",
    location: "Cardiology Dept",
    status: "pending",
  },
];

const recentVisits = [
  {
    id: 1,
    date: "2024-01-10",
    provider: "Dr. Smith",
    type: "Consultation",
    diagnosis: "Hypertension monitoring",
    status: "completed",
  },
  {
    id: 2,
    date: "2023-12-15",
    provider: "Dr. Wilson",
    type: "Lab Results Review",
    diagnosis: "Normal blood work",
    status: "completed",
  },
];

export default function PatientAppointments() {
  const [tab, setTab] = useState("all");
  const weekdays = getWeekdays();

  const {
    // register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      date: "",
      time: "",
      purpose: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Form Data:", data);
    setTab("all");
    reset(); // Optional: reset form after submit
  };

  const renderTable = () => (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-muted rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {new Date(appointment.date).getDate()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{appointment.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time} with {appointment.provider}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {appointment.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentVisits.map((visit) => (
              <div
                key={visit.id}
                className="flex items-center justify-between p-4 border rounded-lg border-muted"
              >
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">{visit.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {visit.date} with {visit.provider}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {visit.diagnosis}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          className=""
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>

        <Search className="w-6 h-6" />
      </div>

      <TabsList className="mb-4 border-background">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="form" className="ml-auto">
          Schedule Appointment
        </TabsTrigger>
      </TabsList>

      {/* Tab content below */}
      <TabsContent value="all">{renderTable()}</TabsContent>

      <TabsContent value="completed">
        <div className="text-gray-600 italic text-center">
          No completed appointments yet.
        </div>
      </TabsContent>

      <TabsContent value="form">
        <Card className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-xl space-y-4 text-sm sm:text-base"
          >
            <h2 className="text-start font-semibold text-lg mb-8">
              New Appointment
            </h2>

            {/* Date */}
            <div>
              <Label className="block mb-1 ">Date</Label>
              <Select
                onValueChange={(value) => setValue("date", value)}
                defaultValue={watch("date")}
              >
                <SelectTrigger className="w-full rounded-md p-2">
                  <SelectValue placeholder="Select Weekday" />
                </SelectTrigger>
                <SelectContent>
                  {weekdays.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.date && (
                <p className="text-red-500 text-xs">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <Label className="block mb-1 ">Time</Label>
              <Select
                onValueChange={(value) => setValue("time", value)}
                defaultValue={watch("time")}
              >
                <SelectTrigger className="w-full rounded-md p-2">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-red-500 text-xs">{errors.time.message}</p>
              )}
            </div>

            {/* Purpose */}
            <div>
              <Label className="block mb-1 ">Purpose</Label>
              <Select
                onValueChange={(value) => setValue("purpose", value)}
                defaultValue={watch("purpose")}
              >
                <SelectTrigger className="w-full rounded-md p-2">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.purpose && (
                <p className="text-red-500 text-xs">{errors.purpose.message}</p>
              )}
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              <Button
                type="submit"
                className="dark:bg-[#2a2348] text-white py-2 rounded-md w-1/2"
              >
                Save
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
