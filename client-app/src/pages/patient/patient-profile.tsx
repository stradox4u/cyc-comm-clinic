import { Mail, MapPin, Phone, Settings, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const patientData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  address: "123 Main St, Anytown, ST 12345",
  dateOfBirth: "March 15, 1985",
  bloodType: "O+",
  allergies: ["Penicillin", "Shellfish"],
  emergencyContact: {
    name: "John Johnson",
    relationship: "Spouse",
    phone: "(555) 987-6543",
  },
};

const PatientProfile = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Full Name</div>
                <div className="text-sm text-muted-foreground">
                  {patientData.name}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">
                  {patientData.email}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-muted-foreground">
                  {patientData.phone}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Address</div>
                <div className="text-sm text-muted-foreground">
                  {patientData.address}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium">Date of Birth</div>
              <div className="text-sm text-muted-foreground">
                {patientData.dateOfBirth}
              </div>
            </div>
            <div>
              <div className="font-medium">Blood Type</div>
              <div className="text-sm text-muted-foreground">
                {patientData.bloodType}
              </div>
            </div>
            <div>
              <div className="font-medium">Allergies</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientData.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium">Emergency Contact</div>
              <div className="text-sm text-muted-foreground">
                {patientData.emergencyContact.name} (
                {patientData.emergencyContact.relationship})
              </div>
              <div className="text-sm text-muted-foreground">
                {patientData.emergencyContact.phone}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default PatientProfile;
