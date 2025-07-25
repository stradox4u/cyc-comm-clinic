import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { FormData } from "../lib/schema";
import SignUpForm from "../components/auth/steps/signup-form";
import OTPVerification from "../components/auth/otp-verification";

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState<"signup" | "otp" | "complete">(
    "otp"
  );
  const [userEmail, setUserEmail] = useState("");
  const [signupData, setSignupData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  const handleSignupComplete = (data: FormData) => {
    setSignupData(data);
    setUserEmail(data.email);
    setCurrentStep("otp");
  };

  const handleOTPVerificationSuccess = () => {
    setCurrentStep("complete");
    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
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
