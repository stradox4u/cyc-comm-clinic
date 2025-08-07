import { User, Phone, Mail, Clock } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  formatDateParts,
  formatPurposeText,
  type Appointment,
  type Provider,
} from "../lib/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import VitalsFormDialog from "./vitals-form";
import { VitalsCard, type VitalsCardProps } from "./vitals-card";
import SoapNoteDialog from "./soap-note-dialog";

interface AppointmentCardProps {
  appointment: Appointment;
  adminRole: boolean;
  providers: Provider[] | undefined;
  loadingProviders: boolean;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProviderId: string | null;
  setSelectedProviderId: React.Dispatch<React.SetStateAction<string | null>>;
  handleAssignProvider: (providerId: string, appointmentId: string) => void;
  sendReminder: (appointmentId: string, method: "sms" | "email") => void;
  setAppointmentId: React.Dispatch<React.SetStateAction<string | null>>;
  viewVitals: boolean;
  loadingVitals: boolean;
  setViewVitals: (val: boolean) => void;
  fetchPatientVitals: (appointmentId: string) => void;
  patientVitals: VitalsCardProps | undefined;
}

export default function AppointmentCard({
  appointment,
  adminRole,
  providers,
  loadingVitals,
  loadingProviders,
  patientVitals,
  toggle,
  setToggle,
  selectedProviderId,
  setSelectedProviderId,
  handleAssignProvider,
  sendReminder,
  setAppointmentId,
  setViewVitals,
  viewVitals,
  fetchPatientVitals,
}: AppointmentCardProps) {
  const isScheduled = appointment.status === "SCHEDULED";

  return (
    <div className="flex items-center justify-between p-4 border border-muted rounded-lg">
      <div className="flex items-center space-x-4">
        {/* Date and Duration */}
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {formatDateParts(appointment.schedule.appointment_date).month}
          </div>
          <div className="text-lg font-semibold">
            {formatDateParts(appointment.schedule.appointment_date).day}
          </div>
          <div className="text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            30 min
          </div>
        </div>

        {/* Appointment Details */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {appointment?.patient ? (
                <>
                  {appointment.patient.first_name}{" "}
                  {appointment.patient.last_name}
                </>
              ) : (
                "No patient info"
              )}
            </span>
            <Badge
              variant={
                appointment.status === "CONFIRMED"
                  ? "default"
                  : appointment.status === "SCHEDULED"
                  ? "secondary"
                  : "destructive"
              }
            >
              {appointment.status}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              {appointment.purposes.includes("OTHERS")
                ? appointment.other_purpose
                : formatPurposeText(appointment.purposes)}{" "}
              {appointment.appointment_providers.length > 0 && (
                <>
                  with{" "}
                  {appointment.appointment_providers
                    .map((ap) => {
                      const p = ap.provider;
                      return `${p.role_title} ${p.first_name} ${p.last_name}`;
                    })
                    .join(", ")}
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                {appointment?.phone ?? "09034348483"}
              </span>
              <span className="flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                {appointment?.email ?? "test@gmail.com"}
              </span>
            </div>
            {appointment.notes && (
              <div className="text-xs italic">{appointment.notes}</div>
            )}
          </div>
          {viewVitals &&
            (loadingVitals ? (
              <Skeleton className="h-16 w-full rounded-md" />
            ) : (
              patientVitals && <VitalsCard {...patientVitals} />
            ))}
        </div>
      </div>

      {/* Actions */}
      {adminRole ? (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => sendReminder(appointment.id, "sms")}
          >
            SMS
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => sendReminder(appointment.id, "email")}
          >
            Email
          </Button>

          {appointment.appointment_providers.length === 0 &&
            (toggle ? (
              <div className="space-y-2">
                <Select
                  onValueChange={(value) => {
                    setSelectedProviderId(value);
                  }}
                  disabled={loadingProviders}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        loadingProviders ? "Loading..." : "Select Provider"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingProviders ? (
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      providers?.map((pro) => (
                        <SelectItem key={pro.id} value={pro.id}>
                          {pro.first_name} {pro.last_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                <Button
                  size="sm"
                  disabled={!selectedProviderId}
                  onClick={() =>
                    selectedProviderId &&
                    handleAssignProvider(selectedProviderId, appointment.id)
                  }
                >
                  Assign
                </Button>
              </div>
            ) : (
              <Button onClick={() => setToggle(true)} size="sm">
                Assign Provider
              </Button>
            ))}
        </div>
      ) : isScheduled ? (
        <>
          <VitalsFormDialog
            appointmentId={appointment.id}
            setAppointmentId={setAppointmentId}
          />
          <SoapNoteDialog appointmentId={appointment.id} />
        </>
      ) : (
        <Button
          onClick={() => {
            setAppointmentId(appointment.id);
            setViewVitals(true);
            fetchPatientVitals(appointment.id);
          }}
        >
          View Vitals
        </Button>
      )}
    </div>
  );
}
