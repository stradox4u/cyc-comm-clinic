import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Clock,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Activity,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export default function ProvidersDashboard() {
  const waitTimeData = [
    { time: "8:00 AM", waitTime: 5, appointments: 3 },
    { time: "9:00 AM", waitTime: 12, appointments: 4 },
    { time: "10:00 AM", waitTime: 25, appointments: 5 },
    { time: "11:00 AM", waitTime: 18, appointments: 4 },
    { time: "12:00 PM", waitTime: 8, appointments: 2 },
    { time: "1:00 PM", waitTime: 15, appointments: 4 },
    { time: "2:00 PM", waitTime: 22, appointments: 5 },
    { time: "3:00 PM", waitTime: 30, appointments: 6 },
    { time: "4:00 PM", waitTime: 20, appointments: 4 },
  ];

  const todayStats = {
    totalAppointments: 32,
    completed: 18,
    noShows: 3,
    cancelled: 2,
    remaining: 9,
    avgWaitTime: 18,
    patientSatisfaction: 4.6,
  };

  const weeklyNoShows = [
    { day: "Mon", rate: 12.5, appointments: 24 },
    { day: "Tue", rate: 8.3, appointments: 24 },
    { day: "Wed", rate: 15.0, appointments: 20 },
    { day: "Thu", rate: 6.7, appointments: 30 },
    { day: "Fri", rate: 10.0, appointments: 30 },
    { day: "Sat", rate: 5.0, appointments: 20 },
    { day: "Sun", rate: 0, appointments: 8 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Provider Analytics
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button>View Schedule</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayStats.totalAppointments}
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{todayStats.completed} completed</span>
                <span>•</span>
                <span>{todayStats.remaining} remaining</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Wait Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayStats.avgWaitTime} min
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />5 min
                better than yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                No-Show Rate
              </CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.4%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                +1.2% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patient Satisfaction
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayStats.patientSatisfaction}/5.0
              </div>
              <p className="text-xs text-muted-foreground">
                Based on 24 reviews this week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="wait-times" className="space-y-4">
          <TabsList>
            <TabsTrigger value="wait-times">Wait Times</TabsTrigger>
            <TabsTrigger value="no-shows">No-Show Analysis</TabsTrigger>
            <TabsTrigger value="appointments">Appointment Status</TabsTrigger>
          </TabsList>

          <TabsContent value="wait-times" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Wait Times by Hour</CardTitle>
                  <CardDescription>
                    Average patient wait time throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {waitTimeData.map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium w-16">
                            {data.time}
                          </span>
                          <div className="flex-1">
                            <Progress
                              value={(data.waitTime / 40) * 100}
                              className="w-32"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {data.waitTime} min
                          </span>
                          <Badge
                            variant={
                              data.waitTime > 20
                                ? "destructive"
                                : data.waitTime > 10
                                ? "secondary"
                                : "default"
                            }
                          >
                            {data.appointments} pts
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wait Time Alerts</CardTitle>
                  <CardDescription>
                    Current status and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-900">
                          High wait times detected
                        </div>
                        <div className="text-sm text-red-700">
                          3:00 PM slot showing 30+ minute delays
                        </div>
                        <Button size="sm" variant="outline" className="mt-2 ">
                          Adjust Schedule
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-900">
                          Lunch break impact
                        </div>
                        <div className="text-sm text-yellow-700">
                          Consider staggered lunch schedules
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-900">
                          Morning efficiency
                        </div>
                        <div className="text-sm text-green-700">
                          8-10 AM showing optimal wait times
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="no-shows" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly No-Show Rates</CardTitle>
                  <CardDescription>
                    No-show percentage by day of week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyNoShows.map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium w-12">
                            {data.day}
                          </span>
                          <div className="flex-1">
                            <Progress value={data.rate} className="w-32" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {data.rate}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({Math.round((data.appointments * data.rate) / 100)}{" "}
                            of {data.appointments})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>No-Show Prevention</CardTitle>
                  <CardDescription>
                    Strategies to reduce no-show rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-muted rounded-lg">
                      <div className="font-medium">Reminder System Status</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        24-hour and 2-hour reminders active
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">SMS: 89% delivery</Badge>
                        <Badge variant="secondary">Email: 76% open rate</Badge>
                      </div>
                    </div>

                    <div className="p-3 border border-muted rounded-lg">
                      <div className="font-medium">High-Risk Appointments</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        3 appointments flagged for today
                      </div>
                      <Button size="sm" variant="outline">
                        Send Extra Reminders
                      </Button>
                    </div>

                    <div className="p-3 border border-muted rounded-lg">
                      <div className="font-medium">Waitlist Management</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        12 patients on waitlist for today
                      </div>
                      <Button size="sm" variant="outline">
                        Fill Slots
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointment Status</CardTitle>
                <CardDescription>
                  Real-time view of appointment progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {todayStats.completed}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {todayStats.remaining}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Remaining
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {todayStats.noShows}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      No-Shows
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      time: "2:30 PM",
                      patient: "John Smith",
                      status: "in-progress",
                      duration: "15 min",
                    },
                    {
                      time: "3:00 PM",
                      patient: "Mary Johnson",
                      status: "waiting",
                      duration: "5 min",
                    },
                    {
                      time: "3:30 PM",
                      patient: "Robert Davis",
                      status: "scheduled",
                      duration: "-",
                    },
                    {
                      time: "4:00 PM",
                      patient: "Lisa Wilson",
                      status: "scheduled",
                      duration: "-",
                    },
                    {
                      time: "4:30 PM",
                      patient: "Michael Brown",
                      status: "high-risk",
                      duration: "-",
                    },
                  ].map((appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-16">
                          {appointment.time}
                        </span>
                        <span className="font-medium">
                          {appointment.patient}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {appointment.duration}
                        </span>
                        <Badge
                          variant={
                            appointment.status === "completed"
                              ? "default"
                              : appointment.status === "in-progress"
                              ? "secondary"
                              : appointment.status === "waiting"
                              ? "outline"
                              : appointment.status === "high-risk"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {appointment.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
