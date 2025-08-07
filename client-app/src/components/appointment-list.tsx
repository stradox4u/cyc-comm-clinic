import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import type { Appointment, Provider } from "../lib/type";
import AppointmentCard from "./appointment-card";
import { type VitalsCardProps } from "./vitals-card";
import { toast } from "sonner";

export default function AppointmentList({
  filteredAppointments,
  adminRole,
  providers,
  loadingProviders,
  toggle,
  setToggle,
  selectedProviderId,
  setSelectedProviderId,
  handleAssignProvider,
  sendReminder,
}: {
  filteredAppointments: Appointment[] | undefined;
  viewVitals: boolean;
  userId: string | undefined;
  adminRole: boolean; // or appropriate type
  providers: Provider[] | undefined; // define ProviderType
  loadingProviders: boolean;
  toggle: boolean;
  appointmentId?: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProviderId: string | null;
  setSelectedProviderId: React.Dispatch<React.SetStateAction<string | null>>;
  handleAssignProvider: (providerId: string, appointmentId: string) => void;
  sendReminder: (appointmentId: string, method: "sms" | "email") => void;
  setAppointmentId: React.Dispatch<React.SetStateAction<string>>;
  setViewVitals: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [viewVitalsAppointmentId, setViewVitalsAppointmentId] = useState<
    string | null
  >(null);
  const [loadingVitals, setLoadingVitals] = useState(false);
  const [patientVitals, setPatientVitals] = useState<VitalsCardProps>();
  
  const fetchPatientVitals = async (appointmentId: string) => {
    setLoadingVitals(true);
    try {
      const response = await fetch(`/api/provider/vitals/${appointmentId}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result?.message || "Failed to update vitals");
        console.error("Server error:", result?.error);
        return;
      }
      setPatientVitals(result?.data?.[0]);
      setViewVitalsAppointmentId(appointmentId);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoadingVitals(false);
    }
  };
  return (
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
          {filteredAppointments?.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              adminRole={adminRole}
              providers={providers}
              loadingProviders={loadingProviders}
              toggle={toggle}
              loadingVitals={loadingVitals}
              setToggle={setToggle}
              selectedProviderId={selectedProviderId}
              setSelectedProviderId={setSelectedProviderId}
              handleAssignProvider={handleAssignProvider}
              sendReminder={sendReminder}
              viewVitals={viewVitalsAppointmentId === appointment.id}
              patientVitals={
                viewVitalsAppointmentId === appointment.id
                  ? patientVitals
                  : undefined
              }
              setAppointmentId={setViewVitalsAppointmentId}
              setViewVitals={(val: boolean) =>
                !val && setViewVitalsAppointmentId(null)
              }
              fetchPatientVitals={fetchPatientVitals}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
