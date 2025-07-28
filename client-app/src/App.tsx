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
import type { ReactNode } from "react";
import ProviderForgotPassword from "./pages/provider/forgot-password-provider";
import PatientForgotPassword from "./pages/patient/forgot-password-patient";
import PatientSignIn from "./pages/patient/patient-sign-in";
import ProviderSignIn from "./pages/provider/provider-sign-in";
import { Toaster } from "sonner";
import PatientAppointments from "./pages/patient/patient-appointment";
import PatientProfile from "./pages/patient/patient-profile";
import PatientFiles from "./pages/patient/patient-files";

// Protected Route Component
function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  // If user is not authenticated, redirect to /signin
  // if (!user) {
  //   return <Navigate to="/auth/patient/login" replace />;
  // }

  return <>{children}</>;
}

const ProtectedLayout = () => (
  <ProtectedRoute>
    <PageLayout>
      <Outlet />
    </PageLayout>
  </ProtectedRoute>
);

function App() {
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

        {/* ❌ Catch-all (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
