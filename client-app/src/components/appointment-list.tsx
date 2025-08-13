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
  adminRole: boolean;
  providers: Provider[] | undefined;
  loadingProviders: boolean;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProviderId: string | null;
  setSelectedProviderId: React.Dispatch<React.SetStateAction<string | null>>;
  handleAssignProvider: (providerId: string, appointmentId: string) => void;
  sendReminder: (appointmentId: string, method: "sms" | "email") => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_appointmentId, setAppointmentId] = useState<string | null>(null);
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
              setToggle={setToggle}
              selectedProviderId={selectedProviderId}
              setSelectedProviderId={setSelectedProviderId}
              handleAssignProvider={handleAssignProvider}
              sendReminder={sendReminder}
              setAppointmentId={setAppointmentId}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
