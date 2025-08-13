import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { FormData } from "../lib/schema";
import SignUpForm from "../components/auth/steps/signup-form";
import OTPVerification from "../components/auth/otp-verification";
import { useAuthStore } from "../store/auth-store";
import { toast } from "sonner";

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState<"signup" | "otp" | "complete">(
    "signup"
  );
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [, setSignupData] = useState<FormData | null>(null);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignupComplete = (data: FormData) => {
    setSignupData(data);
    setUserEmail(data.email);
    setUserPassword(data.password);
    setCurrentStep("otp");
  };

  const handleOTPVerificationSuccess = async () => {
    setCurrentStep("complete");

    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/patient/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Registration failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(`Login failed: ${result.message}`);
    }

    setUser(result?.data);
    toast.success("Registration successful 🎉...");

    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard?onboarding=true");
    }, 2000);
  };

  const handleResendOTP = () => {
    console.log("Resending OTP to:", userEmail);
  };

  if (currentStep === "signup") {
    return <SignUpForm onSignupComplete={handleSignupComplete} />;
  }

  if (currentStep === "otp") {
    return (
      <OTPVerification
        email={userEmail}
        onVerificationSuccess={handleOTPVerificationSuccess}
        onResendOTP={handleResendOTP}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Welcome to CHC Patient Platform! 🎉
        </h2>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default SignUpPage;
