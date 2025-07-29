import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { PageLayout } from "./layout/pageLayout";
import SignUpPage from "./pages/signup";
import ChangePassword from "./pages/change-password";
import { useAuthStore } from "./store/auth-store";
import ProviderForgotPassword from "./pages/provider/forgot-password-provider";
import PatientForgotPassword from "./pages/patient/forgot-password-patient";
import PatientSignIn from "./pages/patient/patient-sign-in";
import ProviderSignIn from "./pages/provider/provider-sign-in";
import { Toaster } from "sonner";
import PatientAppointments from "./pages/patient/patient-appointment";
import PatientProfile from "./pages/patient/patient-profile";
import PatientFiles from "./pages/patient/patient-files";
import { ProviderLayout } from "./layout/providerLayout";
import { useEffect } from "react";
import Appointments from "./pages/admin/all-appointments";
import InsuranceCheck from "./pages/admin/insurance-check";
import PatientIntake from "./pages/admin/patient-intake";
import AllPatients from "./pages/admin/all-patients";
import MobileOutreach from "./pages/admin/mobile-outreach";
import Reminders from "./pages/admin/reminders";

// Protected Route Component
export const ProtectedLayout = () => {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const initializeUser = useAuthStore((state) => state.initializeUser);

  useEffect(() => {
    if (!isInitialized) {
      initializeUser();
    }
  }, [isInitialized, initializeUser]);

  if (!isInitialized) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/patient/login" replace />;
  }
  // Dynamically choose layout based on user role
  const Layout = user.role_title ? ProviderLayout : PageLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  const initializeUser = useAuthStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser(); // restore user from localStorage on load
  }, []);
  return (
    <Router>
      <Toaster richColors />
      <Routes>
        {/* ✅ Public Routes */}
        <Route index path="/" element={<Home />} />

        {/* Patient Auth */}
        <Route path="/auth/patient/login" element={<PatientSignIn />} />
        <Route path="/auth/patient/signup" element={<SignUpPage />} />
        <Route
          path="/auth/patient/forgot-password"
          element={<PatientForgotPassword />}
        />

        {/* Provider Auth */}
        <Route path="/auth/provider/login" element={<ProviderSignIn />} />
        <Route
          path="/auth/provider/forgot-password"
          element={<ProviderForgotPassword />}
        />

        {/* Common Public Route */}
        <Route path="/change-password" element={<ChangePassword />} />

        {/* ✅ Protected Routes - all use ProtectedRoute + PageLayout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<PatientProfile />} />
          <Route path="/files" element={<PatientFiles />} />
          <Route path="/appointment" element={<PatientAppointments />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route path="/provider/appointments" element={<Appointments />} />
          <Route path="/provider/insurance" element={<InsuranceCheck />} />
          <Route path="/provider/intake" element={<PatientIntake />} />
          <Route path="/provider/patients" element={<AllPatients />} />
          <Route path="/provider/outreach" element={<MobileOutreach />} />
          <Route path="/provider/reminders" element={<Reminders />} />
        </Route>

        {/* ❌ Catch-all (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
