import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import AuthLayout from "../../layout/AuthLayout";
import { loginSchema, type LoginData } from "../../lib/schema";
import { Eye, EyeClosed } from "lucide-react";

const SignIn = () => {
  const [login, setLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: LoginData) => {
    console.log("Login data:", data);
    // Handle login API
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 text-black/80"
      >
        <div className="text-center">
          <h2 className="capitalize text-2xl font-medium text-center tracking-wide">
            {login ? "Patient" : "Provider"} Portal Login
          </h2>
          <p>Enter your credentials to access your account</p>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Email/Phone Number</Label>
          <Input
            className="py-6"
            {...register("identifier")}
            placeholder="e.g. user@example.com or 08012345678"
          />

          {errors.identifier && (
            <p className="text-red-500 text-sm">{errors.identifier.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <Label className="font-semibold ">Password</Label>

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
                className="-translate-x-8"
              />
            ) : (
              <Eye
                onClick={() => setShowPassword(true)}
                className="-translate-x-8"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center w-full justify-center">
          <Button
            size={"lg"}
            type="submit"
            className="font-semibold bg-black/90 text-lg w-1/2"
          >
            Login
          </Button>
        </div>

        <div className="text-center text-sm font-semibold space-y-1">
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            Not a patient?{" "}
            <span
              className="text-purple-400 hover:underline cursor-pointer"
              onClick={() => setLogin(!login)}
            >
              {login ? "Provider" : "Patient"} Login
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
