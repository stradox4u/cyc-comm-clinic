import type React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Search,
  FileText,
  Activity,
} from "lucide-react";
import { 
  type Appointment,
  type AppointmentStatus
} from '../lib/type'
import SoapNoteDialog from "../components/soap-note-dialog";
import VitalsFormDialog from "../components/vitals-form";
import { useAuthStore } from "../store/auth-store";

const vitalsHistory = [
  {
    id: "V001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    date: "2024-01-15",
    time: "10:30 AM",
    temperature: "98.6°C",
    blood_pressure: "120/80",
    heart_rate: "72",
    respiratory_rate: "16",
    oxygen_saturation: "98%",
    weight: "75 kg",
    height: "5'6\"",
    bmi: "23.4",
    recordedBy: "Nurse Johnson",
    notes: "Patient feeling well, no complaints",
  },
  {
    id: "V002",
    patientName: "Michael Chen",
    patientId: "P002",
    date: "2024-01-20",
    time: "2:15 PM",
    temperature: "99.2°C",
    blood_pressure: "135/85",
    heart_rate: "78",
    respiratory_rate: "18",
    oxygen_saturation: "97%",
    weight: "180 lbs",
    height: "5'10\"",
    bmi: "25.8",
    recordedBy: "Nurse Smith",
    notes: "Slightly elevated BP, patient reports stress at work",
  },
];

const soapNotes = [
  {
    id: "SOAP001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    date: "2024-01-15",
    provider: "Dr. Martinez",
    chiefComplaint: "Annual physical examination",
    subjective:
      "Patient reports feeling well overall. No new complaints. Continues to take medications as prescribed. Reports good energy levels and sleeping well. No chest pain, shortness of breath, or palpitations.",
    objective:
      "Vital signs stable. Physical examination reveals no acute distress. Heart rate regular, lungs clear to auscultation bilaterally. Abdomen soft, non-tender. Extremities without edema.",
    assessment:
      "1. Hypertension - well controlled on current medications\n2. Type 2 Diabetes - HbA1c improved from last visit\n3. Health maintenance - due for mammogram",
    plan: "1. Continue current antihypertensive regimen\n2. Continue metformin, recheck HbA1c in 3 months\n3. Schedule mammogram\n4. Return in 6 months for follow-up\n5. Patient education on diet and exercise reinforced",
  },
  {
    id: "SOAP002",
    patientName: "Michael Chen",
    patientId: "P002",
    date: "2024-01-20",
    provider: "Dr. Kim",
    chiefComplaint: "Follow-up for asthma and elevated blood pressure",
    subjective:
      "Patient reports increased work stress over past month. Asthma symptoms well controlled with current inhaler. No recent exacerbations. Reports occasional headaches, especially in the morning.",
    objective:
      "BP elevated at 135/85. Lungs clear, good air movement bilaterally. Peak flow 450 L/min (baseline 480). Heart rate regular. No acute distress.",
    assessment:
      "1. Asthma - well controlled\n2. Hypertension - suboptimal control, likely stress-related\n3. Work-related stress",
    plan: "1. Continue current asthma medications\n2. Increase lisinopril to 10mg daily\n3. Stress management counseling referral\n4. Home BP monitoring\n5. Follow-up in 4 weeks",
  },
];

interface VitalsSoapNoteProps {
  appointment?: Appointment
  setAppointmentId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function VitalsSoapPage({
  appointment: propAppointment,
  setAppointmentId
}:VitalsSoapNoteProps) {
  const { appointmentId: urlAppointmentId } = useParams<{ appointmentId: string }>();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const user = useAuthStore((state) => state.user)
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>("SCHEDULED");
  const [hasVitals, setHasVitals] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(propAppointment || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async (appointmentId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/appointment/${appointmentId}`);
        const result = await response.json();
        if (result.success) {
          setAppointment(result.data);
        } else {
          console.error('Failed to fetch appointment:', result.message);
        }
      } catch (error) {
        console.error('Error fetching appointment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (urlAppointmentId && !propAppointment) {
      fetchAppointment(urlAppointmentId);
    } else if (propAppointment) {
      setAppointment(propAppointment);
    }
  }, [urlAppointmentId, propAppointment]);

  useEffect(() => {
    if (appointment?.status) {
      setAppointmentStatus(appointment.status);
    }
  }, [appointment?.status]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Loading appointment data...</h2>
            <p className="text-muted-foreground">Please wait while we load the appointment information.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment || !appointment.id) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-lg font-semibold">No appointment data available</h2>
            <p className="text-muted-foreground">Please select an appointment to view vitals and SOAP notes.</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Vitals & SOAP Notes
          </h1>
          <p className="text-muted-foreground">
            Record patient vitals and clinical documentation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="P001">Sarah Johnson (P001)</SelectItem>
              <SelectItem value="P002">Michael Chen (P002)</SelectItem>
              <SelectItem value="P003">Emily Rodriguez (P003)</SelectItem>
              <SelectItem value="P004">Robert Williams (P004)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="record-vitals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="record-vitals">Record Vitals</TabsTrigger>
          <TabsTrigger value="soap-notes">SOAP Notes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="record-vitals" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Record Vital Signs
                </CardTitle>
                <CardDescription>
                  Enter patient vital signs and measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VitalsFormDialog
                  appointmentId={appointment.id}
                  setAppointmentId={setAppointmentId || (() => {})}
                  userId={user?.id ?? ""}
                  setHasVitals={setHasVitals}
                  setAppointmentStatus={setAppointmentStatus}
                  showAsDialog={false}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Reference</CardTitle>
                <CardDescription>
                  Normal ranges for adult patients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Temperature:</span>
                    <span>97.8°F - 99.1°C</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Blood Pressure:</span>
                    <span>{"<120/80 mmHg"}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Heart Rate:</span>
                    <span>60-100 bpm</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">Respiratory Rate:</span>
                    <span>12-20 breaths/min</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">O2 Saturation:</span>
                    <span>95-100%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="font-medium">BMI:</span>
                    <span>18.5-24.9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="soap-notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                SOAP Note Documentation
              </CardTitle>
              <CardDescription>
                Subjective, Objective, Assessment, and Plan documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SoapNoteDialog 
                appointmentId={appointment.id}
                vitals={appointment.vitals}
                purposes={appointment.purposes || appointment.other_purpose}
                setAppointmentId={setAppointmentId || (() => {})}
                showAsDialog={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Patient Records History</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Vitals</CardTitle>
                <CardDescription>Latest vital sign recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>BP</TableHead>
                      <TableHead>HR</TableHead>
                      <TableHead>Temp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vitalsHistory.map((vital) => (
                      <TableRow key={vital.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {vital.patientName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {vital.patientId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{vital.date}</div>
                            <div className="text-sm text-muted-foreground">
                              {vital.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{vital.blood_pressure}</TableCell>
                        <TableCell>{vital.heart_rate}</TableCell>
                        <TableCell>{vital.temperature}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent SOAP Notes</CardTitle>
                <CardDescription>Latest clinical documentation</CardDescription>
              </CardHeader>
              <CardContent>
                {/*Put soapnote cards here */}
                <div className="space-y-4">
                  {soapNotes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{note.patientName}</div>
                          <div className="text-sm text-muted-foreground">
                            {note.patientId}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{note.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {note.provider}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <strong>Chief Complaint:</strong> {note.chiefComplaint}
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <FileText className="mr-1 h-3 w-3" />
                        View Full Note
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation Templates</CardTitle>
              <CardDescription>
                Pre-built templates for common conditions and procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Annual Physical</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete physical examination template
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Hypertension Follow-up
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Blood pressure management visit
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Diabetes Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Diabetic patient assessment
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Acute Care Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Urgent care or sick visit
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Preventive Care</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Screening and prevention visit
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Mental Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Mental health assessment
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
