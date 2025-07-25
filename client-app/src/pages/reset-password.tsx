import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle } from "lucide-react";

import AuthLayout from "../layout/AuthLayout";
import { resetPasswordSchema, type ResetPasswordData } from "../lib/schema";

type ResetPasswordFormProps = {
  userType: "patient" | "provider";
  submittedEmail: string;
  onResend?: () => void;
  isResending?: boolean;
};

const ResetPasswordForm = ({
  userType,
  submittedEmail,
  onResend,
  isResending,
}: ResetPasswordFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      email: submittedEmail,
    },
  });

  console.log(errors);

  const onSubmit = async (data: ResetPasswordData) => {
    setIsSubmitting(true);

    const { confirmPassword: _, ...payload } = data;
    try {
      const response = await fetch(`/api/auth/${userType}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log(data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      toast.success("Password reset successfully! You can now sign in.");
      navigate(`/auth/${userType}/login`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to reset password";
      toast.error(message);
      console.error("Reset password error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Enter the OTP sent to{" "}
              <span className="font-semibold">{submittedEmail}</span> and your
              new password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <input
                  type="hidden"
                  {...register("email")}
                  defaultValue={submittedEmail}
                />

                <Label htmlFor="otp" className="text-sm font-medium">
                  OTP
                </Label>
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  {...register("otp")}
                  className={`h-12 ${errors.otp ? "border-red-500" : ""}`}
                />
                {errors.otp && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.otp.message}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  {...register("password")}
                  className={`h-12 ${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                  className={`h-12 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.confirmPassword.message}</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#6A5CA3] hover:bg-[#6A5CA3]/90"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            {onResend && (
              <div className="mt-4 text-center">
                <button
                  className="text-sm text-purple-600 hover:underline disabled:text-gray-400"
                  onClick={onResend}
                  disabled={isResending || isSubmitting}
                  type="button"
                >
                  {isResending ? "Resending OTP..." : "Resend OTP"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordForm;
