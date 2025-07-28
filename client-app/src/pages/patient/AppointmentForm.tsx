// AppointmentForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "../../../src/lib/schema";

const purposes = ["Antenatal", "Therapy"];
const statuses = ["Scheduled", "Completed", "Cancelled"];
const coverages = ["Yes", "No", "Pending"];

export default function AppointmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#d6d2e3] max-w-sm mx-auto mt-6 p-6 rounded-xl space-y-4 text-sm sm:text-base"
    >
      <h2 className="text-center font-semibold text-lg text-black mb-2">
        Appointment
      </h2>

      {/* Date */}
      <div>
        <label className="block mb-1">Date</label>
        <input
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
        <label className="block mb-1">Time</label>
        <input
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
        <label className="block mb-1">Purpose</label>
        <select {...register("purpose")} className="w-full rounded-md p-2">
          <option value="">Select purpose</option>
          {purposes.map((purpose) => (
            <option key={purpose} value={purpose}>
              {purpose}
            </option>
          ))}
        </select>
        {errors.purpose && (
          <p className="text-red-500 text-xs">{errors.purpose.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1">Status</label>
        <select {...register("status")} className="w-full rounded-md p-2">
          <option value="">Select status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="text-red-500 text-xs">{errors.status.message}</p>
        )}
      </div>

      {/* Insurance */}
      <div>
        <label className="block mb-1">Insurance Coverage</label>
        <select {...register("insurance")} className="w-full rounded-md p-2">
          <option value="">Select coverage</option>
          {coverages.map((cover) => (
            <option key={cover} value={cover}>
              {cover}
            </option>
          ))}
        </select>
        {errors.insurance && (
          <p className="text-red-500 text-xs">{errors.insurance.message}</p>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 bg-[#2a2348] text-white py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="reset"
          className="flex-1 bg-[#2a2348] text-white py-2 rounded-md"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
