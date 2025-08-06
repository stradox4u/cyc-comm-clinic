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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";

export default function PatientIntake() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    insurance: "",
    insuranceId: "",
    primaryCare: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
    smokingStatus: "",
    alcoholUse: "",
    exerciseFrequency: "",
    reasonForVisit: "",
    symptoms: "",
    painLevel: "",
    consentTreatment: false,
    consentPrivacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consentTreatment || !formData.consentPrivacy) {
      toast.error("Please provide consent for treatment and privacy policy.");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Patient intake data:", formData);

    toast.success("Patient intake form has been successfully submitted.");

    // Reset form or redirect
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      emergencyContact: "",
      emergencyPhone: "",
      insurance: "",
      insuranceId: "",
      primaryCare: "",
      allergies: "",
      medications: "",
      medicalHistory: "",
      smokingStatus: "",
      alcoholUse: "",
      exerciseFrequency: "",
      reasonForVisit: "",
      symptoms: "",
      painLevel: "",
      consentTreatment: false,
      consentPrivacy: false,
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex h-14 items-center px-4">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Patient Intake</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>New Patient Registration</CardTitle>
              <CardDescription>
                Please fill out all required information for patient
                registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">
                        Emergency Contact Name *
                      </Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) =>
                          handleInputChange("emergencyContact", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">
                        Emergency Contact Phone *
                      </Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) =>
                          handleInputChange("emergencyPhone", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Insurance Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Insurance Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="insurance">Insurance Provider</Label>
                      <Input
                        id="insurance"
                        value={formData.insurance}
                        onChange={(e) =>
                          handleInputChange("insurance", e.target.value)
                        }
                        placeholder="e.g., Blue Cross Blue Shield"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceId">Insurance ID</Label>
                      <Input
                        id="insuranceId"
                        value={formData.insuranceId}
                        onChange={(e) =>
                          handleInputChange("insuranceId", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Medical History */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Medical History</h3>
                  <div className="space-y-4">
                    {/* <div className="space-y-2">
                      <Label htmlFor="primaryCare">
                        Primary Care Physician
                      </Label>
                      <Input
                        id="primaryCare"
                        value={formData.primaryCare}
                        onChange={(e) =>
                          handleInputChange("primaryCare", e.target.value)
                        }
                      />
                    </div> */}
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        value={formData.allergies}
                        onChange={(e) =>
                          handleInputChange("allergies", e.target.value)
                        }
                        placeholder="List any known allergies..."
                      />
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        value={formData.medications}
                        onChange={(e) =>
                          handleInputChange("medications", e.target.value)
                        }
                        placeholder="List current medications and dosages..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={(e) =>
                          handleInputChange("medicalHistory", e.target.value)
                        }
                        placeholder="Previous surgeries, chronic conditions, etc..."
                      />
                    </div> */}
                  </div>
                </div>

                {/* <Separator /> */}

                {/* Lifestyle */}
                {/* <div>
                  <h3 className="text-lg font-medium mb-4">
                    Lifestyle Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smokingStatus">Smoking Status</Label>
                      <Select
                        value={formData.smokingStatus}
                        onValueChange={(value) =>
                          handleInputChange("smokingStatus", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never smoked</SelectItem>
                          <SelectItem value="former">Former smoker</SelectItem>
                          <SelectItem value="current">
                            Current smoker
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alcoholUse">Alcohol Use</Label>
                      <Select
                        value={formData.alcoholUse}
                        onValueChange={(value) =>
                          handleInputChange("alcoholUse", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="occasional">Occasional</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exerciseFrequency">
                        Exercise Frequency
                      </Label>
                      <Select
                        value={formData.exerciseFrequency}
                        onValueChange={(value) =>
                          handleInputChange("exerciseFrequency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="1-2">1-2 times/week</SelectItem>
                          <SelectItem value="3-4">3-4 times/week</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}

                {/* <Separator className="text-muted" /> */}

                {/* Current Visit */}
                {/* <div>
                  <h3 className="text-lg font-medium mb-4">Current Visit</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reasonForVisit">Reason for Visit *</Label>
                      <Textarea
                        id="reasonForVisit"
                        value={formData.reasonForVisit}
                        onChange={(e) =>
                          handleInputChange("reasonForVisit", e.target.value)
                        }
                        placeholder="Describe the reason for today's visit..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Current Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        value={formData.symptoms}
                        onChange={(e) =>
                          handleInputChange("symptoms", e.target.value)
                        }
                        placeholder="Describe any current symptoms..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="painLevel">Pain Level (0-10)</Label>
                      <Select
                        value={formData.painLevel}
                        onValueChange={(value) =>
                          handleInputChange("painLevel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pain level" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 11 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i} -{" "}
                              {i === 0
                                ? "No pain"
                                : i <= 3
                                ? "Mild"
                                : i <= 6
                                ? "Moderate"
                                : "Severe"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}

                <Separator />

                {/* Consent */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Consent</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consentTreatment"
                        checked={formData.consentTreatment}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "consentTreatment",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="consentTreatment" className="text-sm">
                        I consent to treatment and understand the risks and
                        benefits *
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consentPrivacy"
                        checked={formData.consentPrivacy}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "consentPrivacy",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="consentPrivacy" className="text-sm">
                        I acknowledge the privacy policy and consent to data
                        processing *
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit">Submit Registration</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
