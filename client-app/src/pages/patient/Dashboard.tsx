import {
  Activity,
  CircleUserRound,
  Dumbbell,
  FileText as File,
  HeartPulse,
  Pill,
  Stethoscope,
  ThermometerSun,
} from "lucide-react";
import { useCheckPatientProfile } from "../../hooks/fetch-patient";
import { Button } from "../../components/ui/button";

function PatientDashboard() {
  const { user, loading } = useCheckPatientProfile();
  console.log(user);

  if (loading) return <p>Loading profile...</p>;
  return (
    <div className="px-4 mb-12">
      <div className="flex justify-between items-center">
        <div className="space-y-2 flex items-center flex-col w-fit">
          <CircleUserRound size={40} />
          <h1>Welcome, {user?.first_name || "Jane Doe"} </h1>
        </div>

        <div className="flex flex-col gap-2 font-semibold text-center text-sm">
          <h3>Clinic Open Hours:</h3>
          <p>Mon - Sat | 7:00am - 12:00am</p>
        </div>
      </div>
      <section className="w-full my-16  space-y-6 max-w-2xl mx-auto">
        <h2 className="font-semibold text-lg text-center">Overview</h2>
        <div className="flex justify-between text-sm">
          <p>Age: 35 | Female</p>

          <p>Last Visit: 2weeks ago</p>
          <div className="flex gap-3">
            <Stethoscope />
            <p>Vitals: Normal</p>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <h4 className="text-lg">Upcoming Appointments</h4>
          <ul className="list-disc px-4 text-sm">
            <li>Dr. Temi - Jun 21, 04:00pm</li>
            <li>Dr. Mark Dennis - Jun 25, 11:00am</li>
          </ul>
          <div className="pt-8 flex justify-center">
            <Button variant={"link"}>view more</Button>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#bcc0f0] py-6 px-8 space-y-8 text-background rounded-xl">
        <h2 className="flex justify-center gap-2 text-lg font-semibold">
          <Stethoscope />
          Recent Vitals
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 place-items-center">
          <p className="flex gap-4 text-sm sm:text-base">
            <Activity />
            BP: 108/97
          </p>
          <p className="flex gap-4 text-sm sm:text-base">
            <HeartPulse fill="#E7E090" />
            Heart Rate: 80 BPM
          </p>
          <p className="flex gap-4 text-sm sm:text-base">
            <Dumbbell />
            Weight: 90kg
          </p>
          <p className="flex gap-4 text-sm sm:text-base">
            <ThermometerSun /> Temperature: 90 °F
          </p>
        </div>
      </section>
      <section className="w-full mt-16 space-y-16">
        <div className="w-full sm:max-w-lg rounded-2xl mx-auto bg-[#bcc0f0] py-12 flex items-center flex-col gap-6 text-background">
          <p className="flex gap-3">
            <Pill fill="#d05f5f" className="text-background" /> Active Meds
          </p>

          <p className="text-sm">Acetaminophen * 200mg * Twice daily</p>
        </div>

        <div className="flex justify-between gap-8 text-background text-xs font-medium">
          <div className="p-12 bg-[#bcc0f0] text-center ">
            <h4 className="flex gap-2 mb-2">
              <File size={16} /> Active Care
            </h4>
            <>Diet Plan</>
          </div>
          <div className="p-12 bg-[#bcc0f0] text-center ">
            <h4 className="flex gap-2 mb-2">
              <File size={16} className="text-" /> Active Care
            </h4>
            <>Treatment Plan</>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientDashboard;
