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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const patients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    address: "123 Main St, City, ST 12345",
    insurance: "Blue Cross Blue Shield",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-10",
    status: "Active",
    riskLevel: "Low",
    conditions: ["Hypertension", "Diabetes Type 2"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P002",
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    phone: "(555) 234-5678",
    email: "m.chen@email.com",
    address: "456 Oak Ave, City, ST 12345",
    insurance: "Aetna",
    lastVisit: "2024-01-20",
    nextAppointment: "2024-02-15",
    status: "Active",
    riskLevel: "Medium",
    conditions: ["Asthma", "High Cholesterol"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P003",
    name: "Emily Rodriguez",
    age: 28,
    gender: "Female",
    phone: "(555) 345-6789",
    email: "emily.r@email.com",
    address: "789 Pine St, City, ST 12345",
    insurance: "Cigna",
    lastVisit: "2024-01-25",
    nextAppointment: null,
    status: "Active",
    riskLevel: "Low",
    conditions: ["Allergies"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P004",
    name: "Robert Williams",
    age: 67,
    gender: "Male",
    phone: "(555) 456-7890",
    email: "r.williams@email.com",
    address: "321 Elm St, City, ST 12345",
    insurance: "Medicare",
    lastVisit: "2024-01-18",
    nextAppointment: "2024-02-05",
    status: "Active",
    riskLevel: "High",
    conditions: ["Heart Disease", "Diabetes Type 2", "Hypertension"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P005",
    name: "Lisa Thompson",
    age: 52,
    gender: "Female",
    phone: "(555) 567-8901",
    email: "lisa.t@email.com",
    address: "654 Maple Dr, City, ST 12345",
    insurance: "United Healthcare",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-02-20",
    status: "Inactive",
    riskLevel: "Medium",
    conditions: ["Arthritis", "Osteoporosis"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const stats = [
  {
    title: "Total Patients",
    value: "1,247",
    change: "+12 this month",
    icon: "👥",
  },
  {
    title: "Active Patients",
    value: "1,089",
    change: "+8 this week",
    icon: "✅",
  },
  { title: "New Registrations", value: "23", change: "This month", icon: "🆕" },
  {
    title: "High Risk Patients",
    value: "156",
    change: "Requires attention",
    icon: "⚠️",
  },
];

export default function AllPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || patient.status.toLowerCase() === statusFilter;
    const matchesRisk =
      riskFilter === "all" || patient.riskLevel.toLowerCase() === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status.toLowerCase() === "active" ? "default" : "secondary";
  };

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
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
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
            <TabsTrigger value="high-risk">High Risk</TabsTrigger>
            <TabsTrigger value="recent">Recent Visits</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={patient.avatar || "/placeholder.svg"}
                            />
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
                              {patient.id} • {patient.age}y • {patient.gender}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="mr-1 h-3 w-3" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="mr-1 h-3 w-3" />
                            {patient.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.insurance}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.lastVisit}</div>
                      </TableCell>
                      <TableCell>
                        {patient.nextAppointment ? (
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            {patient.nextAppointment}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            None scheduled
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeColor(patient.riskLevel)}>
                          {patient.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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
    </div>
  );
}
