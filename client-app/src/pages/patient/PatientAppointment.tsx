// Appointments.tsx
import { Search, User, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

type appointmentsProp = {
  provider?: string;
  purpose?: string;
  date?: string;
  time?: string;
}[];

const appointments: appointmentsProp = [
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
  return (
    <div className="min-h-screen bg-[#f6f3f8] p-4 sm:p-8">
      {/* Status bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <Search className="w-5 h-5" />
          <User className="w-5 h-5" />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#bba9d1] rounded-xl p-2 flex justify-between items-center text-white font-medium">
        <div className="flex gap-4">
          <button className="border-b-2 border-white">All</button>
          <button className="opacity-60">Completed</button>
        </div>
        <NavLink to={"/appointment-form"}>
          <button className="flex items-center gap-1">
            Add Appointment <Plus size={16} />
          </button>
        </NavLink>
      </div>

      {/* Table */}
      <div className="mt-6 grid gap-3">
        {appointments.map((appt, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm p-3 text-sm sm:text-base flex justify-between items-center"
          >
            <div className="flex-1 font-semibold">{appt.provider}</div>
            <div className="flex-1 text-gray-600">{appt.purpose}</div>
            <div className="flex-1 text-gray-500">{appt.date}</div>
            <div className="flex-1 text-gray-500">{appt.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
