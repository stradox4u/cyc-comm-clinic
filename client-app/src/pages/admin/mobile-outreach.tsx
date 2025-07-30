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
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  MapPin,
  Calendar,
  Users,
  Wifi,
  WifiOff,
  Smartphone,
  Syringe,
  Heart,
  Activity,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";

export default function MobileOutreach() {
  const [isOnline, setIsOnline] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"synced" | "pending" | "error">(
    "pending"
  );

  const upcomingEvents = [
    {
      id: 1,
      name: "Community Center Vaccination Drive",
      date: "2024-01-15",
      time: "9:00 AM - 4:00 PM",
      location: "Downtown Community Center",
      address: "123 Main St, City, ST 12345",
      type: "vaccination",
      expectedAttendees: 150,
      staff: ["Dr. Smith", "Nurse Johnson", "Tech Williams"],
      services: ["COVID-19 Vaccine", "Flu Shot", "Health Screening"],
    },
    {
      id: 2,
      name: "Senior Center Health Screening",
      date: "2024-01-18",
      time: "10:00 AM - 2:00 PM",
      location: "Sunset Senior Center",
      address: "456 Oak Ave, City, ST 12345",
      type: "screening",
      expectedAttendees: 75,
      staff: ["Dr. Davis", "Nurse Brown"],
      services: ["Blood Pressure Check", "Diabetes Screening", "Vision Test"],
    },
    {
      id: 3,
      name: "School Health Fair",
      date: "2024-01-22",
      time: "8:00 AM - 3:00 PM",
      location: "Lincoln Elementary School",
      address: "789 Pine St, City, ST 12345",
      type: "health-fair",
      expectedAttendees: 200,
      staff: ["Dr. Wilson", "Nurse Garcia", "Tech Martinez"],
      services: ["Vision Screening", "Hearing Test", "Immunizations"],
    },
  ];

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    address: "",
    type: "",
    expectedAttendees: "",
    services: "",
    notes: "",
  });

  const handleSync = () => {
    setSyncStatus("pending");
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus("synced");
      toast.success("All data has been synchronized with the main system.");
    }, 2000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mobile outreach event has been scheduled successfully.");
    setNewEvent({
      name: "",
      date: "",
      time: "",
      location: "",
      address: "",
      type: "",
      expectedAttendees: "",
      services: "",
      notes: "",
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "vaccination":
        return <Syringe className="h-4 w-4" />;
      case "screening":
        return <Heart className="h-4 w-4" />;
      case "health-fair":
        return <Activity className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <div className="flex h-14 items-center px-4">
          <div className="ml-4 flex-1"></div>
          <div className="flex items-center space-x-2">
            <Badge
              variant={isOnline ? "default" : "secondary"}
              className="flex items-center space-x-1"
            >
              {isOnline ? (
                <Wifi className="h-3 w-3" />
              ) : (
                <WifiOff className="h-3 w-3" />
              )}
              <span>{isOnline ? "Online" : "Offline"}</span>
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSync}
              disabled={syncStatus === "pending"}
            >
              {syncStatus === "pending" ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : syncStatus === "synced" ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Synced
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Sync Error
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Mobile Outreach Events
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={() => setIsOnline(!isOnline)}>
              <Smartphone className="h-4 w-4 mr-2" />
              {isOnline ? "Go Offline" : "Go Online"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="create">Create Event</TabsTrigger>
            <TabsTrigger value="data">Field Data</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="grid gap-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center space-x-2">
                          {getEventIcon(event.type)}
                          <span>{event.name}</span>
                        </CardTitle>
                        <CardDescription>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{event.date}</span>
                            </span>
                            <span>{event.time}</span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{event.expectedAttendees} expected</span>
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type.replace("-", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          <div>{event.location}</div>
                          <div>{event.address}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Staff Assigned</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.staff.map((staff, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {staff}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium mb-2">Services Offered</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.services.map((service, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        Edit Event
                      </Button>
                      <Button size="sm">Start Check-in</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Outreach Event</CardTitle>
                <CardDescription>
                  Schedule a new mobile outreach event for community health
                  services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        value={newEvent.name}
                        onChange={(e) =>
                          setNewEvent((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g., Community Vaccination Drive"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) =>
                          setNewEvent((prev) => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vaccination">
                            Vaccination Drive
                          </SelectItem>
                          <SelectItem value="screening">
                            Health Screening
                          </SelectItem>
                          <SelectItem value="health-fair">
                            Health Fair
                          </SelectItem>
                          <SelectItem value="education">
                            Health Education
                          </SelectItem>
                          <SelectItem value="testing">
                            Medical Testing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventTime">Time *</Label>
                      <Input
                        id="eventTime"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent((prev) => ({
                            ...prev,
                            time: e.target.value,
                          }))
                        }
                        placeholder="e.g., 9:00 AM - 4:00 PM"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location Name *</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        placeholder="e.g., Community Center"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={newEvent.address}
                        onChange={(e) =>
                          setNewEvent((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Full address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedAttendees">
                        Expected Attendees
                      </Label>
                      <Input
                        id="expectedAttendees"
                        type="number"
                        value={newEvent.expectedAttendees}
                        onChange={(e) =>
                          setNewEvent((prev) => ({
                            ...prev,
                            expectedAttendees: e.target.value,
                          }))
                        }
                        placeholder="Estimated number of attendees"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">Services to be Offered</Label>
                    <Textarea
                      id="services"
                      value={newEvent.services}
                      onChange={(e) =>
                        setNewEvent((prev) => ({
                          ...prev,
                          services: e.target.value,
                        }))
                      }
                      placeholder="List the services that will be provided (e.g., vaccinations, screenings, consultations)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={newEvent.notes}
                      onChange={(e) =>
                        setNewEvent((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Any special requirements, equipment needed, or other important information"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                    <Button type="submit">Create Event</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Field Data Collection</CardTitle>
                  <CardDescription>
                    Data collected during outreach events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Patients Served Today</div>
                        <div className="text-sm text-muted-foreground">
                          Community Center Event
                        </div>
                      </div>
                      <div className="text-2xl font-bold">47</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Vaccinations Given</div>
                        <div className="text-sm text-muted-foreground">
                          COVID-19 & Flu shots
                        </div>
                      </div>
                      <div className="text-2xl font-bold">32</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Screenings Completed</div>
                        <div className="text-sm text-muted-foreground">
                          BP, Diabetes, Vision
                        </div>
                      </div>
                      <div className="text-2xl font-bold">28</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Referrals Made</div>
                        <div className="text-sm text-muted-foreground">
                          Follow-up appointments
                        </div>
                      </div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sync Status</CardTitle>
                  <CardDescription>
                    Data synchronization with main clinic system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="font-medium">Patient Records</div>
                          <div className="text-sm text-muted-foreground">
                            Last sync: 2 min ago
                          </div>
                        </div>
                      </div>
                      <Badge variant="default">Synced</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Upload className="h-4 w-4 text-blue-500 animate-pulse" />
                        <div>
                          <div className="font-medium">Vaccination Data</div>
                          <div className="text-sm text-muted-foreground">
                            Uploading...
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <div>
                          <div className="font-medium">Inventory Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Connection error
                          </div>
                        </div>
                      </div>
                      <Badge variant="destructive">Failed</Badge>
                    </div>
                    <Button className="w-full" onClick={handleSync}>
                      <Upload className="h-4 w-4 mr-2" />
                      Force Sync All Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Offline Capabilities</CardTitle>
                <CardDescription>
                  Features available when working without internet connection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="font-medium">Patient Check-in</div>
                    <div className="text-sm text-muted-foreground">
                      Register new patients offline
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Syringe className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="font-medium">Service Tracking</div>
                    <div className="text-sm text-muted-foreground">
                      Record vaccinations & screenings
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <div className="font-medium">Data Collection</div>
                    <div className="text-sm text-muted-foreground">
                      Store data locally until sync
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
