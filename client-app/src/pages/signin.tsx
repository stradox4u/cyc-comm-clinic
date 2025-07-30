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

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [resolvedUserType, setResolvedUserType] = useState<
    "patient" | "provider"
  >("patient");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    const endpoint = `/api/auth/${resolvedUserType}/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

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

  const toggleUserType = () => {
    const newType = resolvedUserType === "patient" ? "provider" : "patient";
    setResolvedUserType(newType);
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 text-black/80"
      >
        <div className="text-start">
          <h2 className="capitalize text-xl font-semibold tracking-tighter text-center">
            {resolvedUserType} Portal Login
          </h2>
          <p className="text-sm">
            Welcome back! Enter your credentials to access your account.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Email</Label>
          <Input
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
            placeholder="e.g. user@example.com"
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
            className={`${
              errors.email ? "border-red-500" : ""
            } placeholder:text-2xl`}
          />
          <div className="text-gray-400 absolute -right-3 top-8">
            {showPassword ? (
              <EyeClosed
                onClick={() => setShowPassword(false)}
                className="-translate-x-8 cursor-pointer size-5"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="-translate-x-8 cursor-pointer size-5"
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
            to={`/forgot-password?type=${resolvedUserType}`}
            className="text-sm text-[#6A5CA3] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            type="submit"
            className="font-semibold bg-black/90 text-white text-lg w-1/2 my-4"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        <div className="text-center text-sm font-semibold">
          <p>
            Don&apos;t have an account yet?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            Not a {resolvedUserType}?{" "}
            <Button
              variant={"link"}
              className="text-purple-400 hover:underline px-1 p-0"
              onClick={toggleUserType}
            >
              Switch to{" "}
              {resolvedUserType === "patient" ? "Provider" : "Patient"} Login
            </Button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
