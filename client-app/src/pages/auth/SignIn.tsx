import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import AuthLayout from "../../layout/AuthLayout";

// 🔐 Zod Schema for login form
const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or Phone number is required")
    .refine(
      (val) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) || /^\d{10,15}$/.test(val),
      {
        message: "Enter a valid email or phone number",
      }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

const SignIn = () => {
  const [login, setLogin] = useState(true);

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
        className="flex flex-col space-y-8 text-white"
      >
        <h2 className="capitalize text-2xl font-semibold text-center">
          {login ? "Patient" : "Provider"} Login
        </h2>

        <div className="space-y-2">
          <Label className="font-semibold">Email/Phone Number</Label>
          <Input
            {...register("identifier")}
            placeholder="e.g. user@example.com or 08012345678"
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm">{errors.identifier.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="font-semibold bg-blue-600">
          Login
        </Button>

        <div className="text-center text-sm font-semibold space-y-1">
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            Not a patient?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
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
