import { useAuthStore } from "../store/auth-store";
import AdminDashboard from "./admin/admin-dashboard";
import ReceptionistDashboard from "./admin/receptionist-dashboard";
import PatientDashboard from "./patient/patient-dashboard";
import ProviderDashboard from "./provider-dashboard";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);

  const providerRoles = new Set([
    "GENERAL_PRACTIONER",
    "NURSE",
    "PHARMACIST",
    "LAB_TECHNICIAN",
    "PAEDIATRICIAN",
    "GYNAECOLOGIST",
  ]);

  const adminRoles = new Set(["ADMIN"]);
  const receptionistRoles = new Set(["RECEPTIONIST"]);

  if (!user?.role_title) {
    return <PatientDashboard />;
  }

  if (adminRoles.has(user.role_title)) {
    return <AdminDashboard />; // or a placeholder for now
  }

  if (providerRoles.has(user.role_title)) {
    return <ProviderDashboard />;
  }

  if (receptionistRoles.has(user.role_title)) {
    return <ReceptionistDashboard />; // if you have one
  }

  // Default fallback
  return <PatientDashboard />;
};
export default Dashboard;
