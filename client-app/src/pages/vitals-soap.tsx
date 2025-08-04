import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
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
  Heart,
  Thermometer,
  Activity,
  Scale,
  Ruler,
  Save,
  Search,
  FileText,
} from "lucide-react";

const vitalsHistory = [
  {
    id: "V001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    date: "2024-01-15",
    time: "10:30 AM",
    temperature: "98.6°C",
    bloodPressure: "120/80",
    heartRate: "72",
    respiratoryRate: "16",
    oxygenSaturation: "98%",
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
    bloodPressure: "135/85",
    heartRate: "78",
    respiratoryRate: "18",
    oxygenSaturation: "97%",
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

export default function VitalsSoapPage() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Vitals form state
  const [vitals, setVitals] = useState({
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    weight: "",
    height: "",
    notes: "",
  });

  // SOAP note form state
  const [soapNote, setSoapNote] = useState({
    chiefComplaint: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });

  const handleVitalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vitals submitted:", vitals);
    // Reset form
    setVitals({
      temperature: "",
      bloodPressure: "",
      heartRate: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      weight: "",
      height: "",
      notes: "",
    });
  };

  const handleSoapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SOAP note submitted:", soapNote);
    // Reset form
    setSoapNote({
      chiefComplaint: "",
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
    });
  };

  const calculateBMI = (weight: string, height: string) => {
    // Simple BMI calculation (assuming weight in lbs, height in inches)
    const weightNum = Number.parseFloat(weight);
    const heightNum = Number.parseFloat(height);
    if (weightNum && heightNum) {
      const bmi = (weightNum / (heightNum * heightNum)) * 703;
      return bmi.toFixed(1);
    }
    return "";
  };

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
                <form onSubmit={handleVitalsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="temperature"
                        className="flex items-center"
                      >
                        <Thermometer className="mr-1 h-4 w-4" />
                        Temperature (°C)
                      </Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="98.6"
                        value={vitals.temperature}
                        onChange={(e) =>
                          setVitals({ ...vitals, temperature: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="bloodPressure"
                        className="flex items-center"
                      >
                        <Heart className="mr-1 h-4 w-4" />
                        Blood Pressure
                      </Label>
                      <Input
                        id="bloodPressure"
                        placeholder="120/80"
                        value={vitals.bloodPressure}
                        onChange={(e) =>
                          setVitals({
                            ...vitals,
                            bloodPressure: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                      <Input
                        id="heartRate"
                        type="number"
                        placeholder="72"
                        value={vitals.heartRate}
                        onChange={(e) =>
                          setVitals({ ...vitals, heartRate: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                      <Input
                        id="respiratoryRate"
                        type="number"
                        placeholder="16"
                        value={vitals.respiratoryRate}
                        onChange={(e) =>
                          setVitals({
                            ...vitals,
                            respiratoryRate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="oxygenSaturation">
                        O2 Saturation (%)
                      </Label>
                      <Input
                        id="oxygenSaturation"
                        type="number"
                        placeholder="98"
                        value={vitals.oxygenSaturation}
                        onChange={(e) =>
                          setVitals({
                            ...vitals,
                            oxygenSaturation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center">
                        <Scale className="mr-1 h-4 w-4" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="150"
                        value={vitals.weight}
                        onChange={(e) =>
                          setVitals({ ...vitals, weight: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center">
                      <Ruler className="mr-1 h-4 w-4" />
                      Height (inches)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="66"
                      value={vitals.height}
                      onChange={(e) =>
                        setVitals({ ...vitals, height: e.target.value })
                      }
                    />
                  </div>

                  {vitals.weight && vitals.height && (
                    <div className="p-3 bg-muted rounded-lg">
                      <Label className="text-sm font-medium">
                        Calculated BMI:
                      </Label>
                      <div className="text-lg font-bold">
                        {calculateBMI(vitals.weight, vitals.height)}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="vitals-notes">Notes</Label>
                    <Textarea
                      id="vitals-notes"
                      placeholder="Additional observations or notes..."
                      value={vitals.notes}
                      onChange={(e) =>
                        setVitals({ ...vitals, notes: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Vitals
                  </Button>
                </form>
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
              <form onSubmit={handleSoapSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="chief-complaint">Chief Complaint</Label>
                  <Input
                    id="chief-complaint"
                    placeholder="Patient's primary concern or reason for visit"
                    value={soapNote.chiefComplaint}
                    onChange={(e) =>
                      setSoapNote({
                        ...soapNote,
                        chiefComplaint: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjective">Subjective</Label>
                  <Textarea
                    id="subjective"
                    placeholder="Patient's description of symptoms, history of present illness, review of systems..."
                    rows={4}
                    value={soapNote.subjective}
                    onChange={(e) =>
                      setSoapNote({ ...soapNote, subjective: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objective">Objective</Label>
                  <Textarea
                    id="objective"
                    placeholder="Physical examination findings, vital signs, laboratory results, imaging..."
                    rows={4}
                    value={soapNote.objective}
                    onChange={(e) =>
                      setSoapNote({ ...soapNote, objective: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessment">Assessment</Label>
                  <Textarea
                    id="assessment"
                    placeholder="Clinical impression, differential diagnosis, problem list..."
                    rows={3}
                    value={soapNote.assessment}
                    onChange={(e) =>
                      setSoapNote({ ...soapNote, assessment: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Plan</Label>
                  <Textarea
                    id="plan"
                    placeholder="Treatment plan, medications, follow-up instructions, patient education..."
                    rows={4}
                    value={soapNote.plan}
                    onChange={(e) =>
                      setSoapNote({ ...soapNote, plan: e.target.value })
                    }
                  />
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save SOAP Note
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Template
                  </Button>
                </div>
              </form>
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
                        <TableCell>{vital.bloodPressure}</TableCell>
                        <TableCell>{vital.heartRate}</TableCell>
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
