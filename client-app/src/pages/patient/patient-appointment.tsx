import { Search, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentFormData } from "../../lib/schema";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

type Appointment = {
  provider?: string;
  purpose?: string;
  date?: string;
  time?: string;
};

const purposes = ["Antenatal", "Therapy"];
const statuses = ["Scheduled", "Completed", "Cancelled"];
const coverages = ["Yes", "No", "Pending"];

const appointments: Appointment[] = [
  {
    provider: "Dr. Oke",
    purpose: "Antenatal",
    date: "Tuesday",
    time: "09:00am",
  },
  {
    provider: "Dr. Temi",
    purpose: "Colonoscopy",
    date: "Friday",
    time: "10:00am",
  },
  {
    provider: "Dr. Mike",
    purpose: "Obgyn",
    date: "30th July",
    time: "12:00pm",
  },
  {
    provider: "Dr. Tuoyo",
    purpose: "Therapy",
    date: "7th August",
    time: "08:00am",
  },
  {
    provider: "Dr. Oke",
    purpose: "Antenatal",
    date: "14th August",
    time: "09:00am",
  },
  {
    provider: "Dr. Karen",
    purpose: "Dietician",
    date: "20th August",
    time: "02:00pm",
  },
  {
    provider: "Dr. Tuoyo",
    purpose: "Therapy",
    date: "21st August",
    time: "04:00pm",
  },
  {
    provider: "Dr. Brown",
    purpose: "Physiotherapy",
    date: "30th August",
    time: "09:00am",
  },
  {
    provider: "Dr. Oke",
    purpose: "Antenatal",
    date: "1st September",
    time: "09:00am",
  },
  {
    provider: "Dr. Oke",
    purpose: "Antenatal",
    date: "15th September",
    time: "09:00am",
  },
];

export default function PatientAppointments() {
  const [step, setStep] = useState<"all" | "completed" | "form">("all");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Form Data:", data);
    setStep("all");
    reset(); // Optional: reset form after submit
  };

  const renderTable = (data: Appointment[]) => (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 text-sm sm:text-base flex justify-between items-center text-gray-600">
        <p>Provider</p>
        <p>Purpose</p>
        <p>Date</p>
        <p>Time</p>
      </div>
      {data.map((appt, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm p-3 text-sm sm:text-base flex justify-between items-center"
        >
          <div className="font-medium text-gray-600">{appt.provider}</div>
          <div className="text-gray-600">{appt.purpose}</div>
          <div className="text-gray-500">{appt.date}</div>
          <div className="text-gray-500">{appt.time}</div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen p-4 sm:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          className=""
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </Button>

        <Search className="w-6 h-6" />
      </div>

      {/* Tabs - Always visible */}
      <div className="rounded-xl p-2 flex justify-end items-center text-white font-medium mb-4">
        <div className="flex gap-12">
          <button
            className={
              step === "all" ? "border-b-2 border-white" : "opacity-60"
            }
            onClick={() => setStep("all")}
          >
            All
          </button>
          <button
            className={
              step === "completed" ? "border-b-2 border-white" : "opacity-60"
            }
            onClick={() => setStep("completed")}
          >
            Completed
          </button>
          <button
            onClick={() => setStep("form")}
            className="flex items-center gap-1 hover:underline"
          >
            Add Appointment <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Page Content Based on Step */}
      <div className="mt-6 grid gap-3">
        {step === "form" && (
          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#d6d2e3] p-6 rounded-xl space-y-4 text-sm sm:text-base"
            >
              <h2 className="text-center font-semibold text-lg text-black mb-2">
                New Appointment
              </h2>

              {/* Date */}
              <div>
                <Label className="block mb-1 text-gray-700">Date</Label>
                <Input
                  type="date"
                  {...register("date")}
                  className="w-full rounded-md p-2"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs">{errors.date.message}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <Label className="block mb-1 text-gray-700">Time</Label>
                <Input
                  type="time"
                  {...register("time")}
                  className="w-full rounded-md p-2"
                />
                {errors.time && (
                  <p className="text-red-500 text-xs">{errors.time.message}</p>
                )}
              </div>

              {/* Purpose */}
              <div>
                <Label className="block mb-1 text-gray-700">Purpose</Label>
                <select
                  {...register("purpose")}
                  className="w-full rounded-md p-2 bg-black"
                >
                  <option value="">Select purpose</option>
                  {purposes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.purpose && (
                  <p className="text-red-500 text-xs">
                    {errors.purpose.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <Label className="block mb-1 text-gray-700">Status</Label>
                <select
                  {...register("status")}
                  className="w-full rounded-md p-2 bg-black"
                >
                  <option value="">Select status</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Insurance */}
              <div>
                <Label className="block mb-1 text-gray-700">
                  Insurance Coverage
                </Label>
                <select
                  {...register("insurance")}
                  className="w-full rounded-md p-2 bg-black"
                >
                  <option value="">Select coverage</option>
                  {coverages.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.insurance && (
                  <p className="text-red-500 text-xs">
                    {errors.insurance.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#2a2348] text-white py-2 rounded-md"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => reset()}
                  className="flex-1 bg-[#2a2348] text-white py-2 rounded-md"
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === "all" && renderTable(appointments)}

        {step === "completed" && (
          <div className="text-gray-600 italic text-center">
            No completed appointments yet.
          </div>
        )}
      </div>
    </div>
  );
}
