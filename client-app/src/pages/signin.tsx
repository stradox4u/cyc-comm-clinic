import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "../store/auth-store";
import { loginSchema, type LoginData } from "../lib/schema";
import { toast } from "sonner";
import AuthLayout from "../layout/AuthLayout";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface SignInPageProps {
  userType: "patient" | "provider";
}

const SignInPage = ({ userType }: SignInPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    const endpoint = `/api/auth/${userType}/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      setUser(result.data);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Invalid email or password. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 text-black/80"
      >
        <div className="text-center">
          <h2 className="capitalize text-2xl font-medium tracking-tight">
            {userType} Portal Login
          </h2>
          <p className="text-sm">
            Welcome back! Enter your credentials to access your account.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Email</Label>
          <Input
            className="py-6"
            {...register("email")}
            placeholder="e.g. user@example.com or 08012345678"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <Label className="font-medium">Password</Label>
          <Input
            {...register("password")}
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            className="placeholder:text-2xl py-6"
          />
          <div className="text-gray-400 absolute -right-3 top-9">
            {showPassword ? (
              <EyeClosed
                onClick={() => setShowPassword(false)}
                className="-translate-x-8 cursor-pointer"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="-translate-x-8 cursor-pointer"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-[#6A5CA3] focus:ring-[#6A5CA3] border-gray-300 rounded"
            />
            <Label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </Label>
          </div>
          <Link
            to={`/auth/${userType}/forgot-password`}
            className="text-sm text-[#6A5CA3] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            type="submit"
            className="font-semibold bg-black/90 text-white text-lg w-1/2"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        <div className="text-center text-sm font-semibold space-y-1">
          <p>
            Don&apos;t have an account yet?{" "}
            <Link
              to="/auth/patient/signup"
              className="text-purple-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p>
            Not a {userType}?{" "}
            <Link
              className="text-purple-400 hover:underline"
              to={`/auth/${
                userType === "patient" ? "provider" : "patient"
              }/login`}
            >
              Switch to {userType === "patient" ? "Provider" : "Patient"} Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
