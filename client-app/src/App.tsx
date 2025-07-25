import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
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

// Protected Route Component
function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  // If user is not authenticated, redirect to /signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Toaster richColors />
      <Routes>
        <Route index path="/" element={<Home />} />
        {/* Patient Routes */}
        <Route path="/auth/patient/login" element={<PatientSignIn />} />
        <Route path="/auth/patient/signup" element={<SignUpPage />} />
        <Route
          path="/auth/patient/forgot-password"
          element={<PatientForgotPassword />}
        />

        {/* Provider Routes */}
        <Route path="/auth/provider/login" element={<ProviderSignIn />} />
        {/* <Route
          path="/auth/provider/signup"
          element={<SignUpPage type="provider" />}
        /> */}
        <Route
          path="/auth/provider/forgot-password"
          element={<ProviderForgotPassword />}
        />

        <Route path="/change-password" element={<ChangePassword />} />
        {/* Will return to protected route after API integration*/}
        <Route
          path="/dashboard"
          element={
            <PageLayout>
              <Dashboard />
            </PageLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
