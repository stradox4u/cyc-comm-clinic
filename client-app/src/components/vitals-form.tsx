import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Activity,
  Loader2,
  Save,
  Thermometer,
  Heart,
  Ruler,
  Scale,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function VitalsFormDialog({
  appointmentId,
  setAppointmentId,
  userId,
}: {
  appointmentId: string;
  setAppointmentId: React.Dispatch<React.SetStateAction<string | null>>;
  userId?: string;
}) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateBMI = (weight: string, height: string) => {
    const weightNum = Number.parseFloat(weight);
    const heightNum = Number.parseFloat(height);
    if (weightNum && heightNum) {
      const bmi = (weightNum / (heightNum * heightNum)) * 703;
      return bmi.toFixed(1);
    }
    return "";
  };

  const handleVitalsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/provider/vitals/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointmentId,
          blood_pressure: vitals.bloodPressure,
          heart_rate: vitals.heartRate,
          temperature: vitals.temperature,
          height: vitals.height,
          weight: vitals.weight,
          created_by_id: userId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result?.message || "Failed to update vitals");
        console.error("Server error:", result?.error);
        return;
      }

      const updateStatusRes = await fetch(`/api/appointment/${appointmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ATTENDING" }),
      });

      const updateStatusResult = await updateStatusRes.json();

      if (!updateStatusRes.ok || !updateStatusResult.success) {
        toast.error("Vitals saved, but failed to update appointment status.");
        return;
      }
      toast.success("Patient vitals updated, status set to ATTENDING");
    } catch (error) {
      console.error("Error updating patient appointment:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }

    // ✅ Reset vitals form
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setAppointmentId(appointmentId)}>
          Take Vitals
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Record Vital Signs
          </DialogTitle>
          <DialogDescription>
            Enter patient vital signs and measurements
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => handleVitalsSubmit(e)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center">
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
                  setVitals({
                    ...vitals,
                    temperature: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodPressure" className="flex items-center">
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
                  setVitals({
                    ...vitals,
                    heartRate: e.target.value,
                  })
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
              <Label htmlFor="oxygenSaturation">O2 Saturation (%)</Label>
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
                  setVitals({
                    ...vitals,
                    weight: e.target.value,
                  })
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
                setVitals({
                  ...vitals,
                  height: e.target.value,
                })
              }
            />
          </div>

          {vitals.weight && vitals.height && (
            <div className="p-3 bg-muted rounded-lg">
              <Label className="text-sm font-medium">Calculated BMI:</Label>
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
                setVitals({
                  ...vitals,
                  notes: e.target.value,
                })
              }
            />
          </div>

          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin size-6" />
                Submitting...
              </>
            ) : (
              <>
                {" "}
                <Save className="mr-2 h-4 w-4" />
                Save Vitals
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
