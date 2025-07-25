import { CheckCircle } from "lucide-react";

const RegistrationCompleteStep = () => {
  return (
    <div className="text-center space-y-6 text-black">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-green-600">
        Account Created Successfully! 🎉
      </h2>
      <p className="text-gray-700 font-medium">
        Your account has been created. Please check your email for a
        verification code to complete the setup process.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Next Step:</strong> We've sent a verification code to your
          email address. Please verify your account to access your dashboard.
        </p>
      </div>
    </div>
  );
};

export default RegistrationCompleteStep;
