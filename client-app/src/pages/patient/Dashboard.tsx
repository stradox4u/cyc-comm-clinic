import { useCheckPatientProfile } from "../../hooks/fetch-patient";

function PatientDashboard() {
  const { user, loading } = useCheckPatientProfile();
  if (loading) return <p>Loading profile...</p>;
  return (
    <div>
      <h1>Welcome, {user?.first_name}</h1>
      <section className="flex flex-row w-full mb-6 mt-16 p-16">Bio</section>
      <section className="w-full mb-6 p-16">Recent Vitals</section>
      <section className="w-full p-16">Management Plan</section>
    </div>
  );
}

export default PatientDashboard;
