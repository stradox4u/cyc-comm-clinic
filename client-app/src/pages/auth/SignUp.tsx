import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import AuthLayout from "../../layout/AuthLayout";
import { Eye, EyeClosed } from "lucide-react";
import { fullSchema, type FormData } from "../../lib/schema";

const getProgressPercentage = (step: number) => {
  switch (step) {
    case 2:
      return 33;
    case 3:
      return 66;
    case 4:
      return 100;
    default:
      return 0;
  }
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const nextStep = async () => {
    let valid = true;
    if (step === 2) {
      valid = await trigger([
        "first_name",
        "last_name",
        "email",
        "phone",
        "date_of_birth",
        "gender",
        "address",
        "occupation",
        "emergencyName",
        "emergencyNumber",
        "bloodGroup",
        "allergies",
        "insurance",
      ]);
    } else if (step === 3) {
      valid = await trigger(["password", "confirmPassword"]);
    }

    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    console.log("Final data:", data);
    // Handle API call or state update
    setStep(4);
  };

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white space-y-6 relative z-20"
        >
          {/* Step Indicator */}
          {/* Progress Bar & Step Text - Hidden on Welcome Page */}
          {step !== 1 && (
            <div className="flex gap-4 items-center">
              <div className="w-full bg-blue-900/50 rounded h-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(step)}%` }}
                />
              </div>
              <p className="text-sm text-white font-semibold text-nowrap">
                {getProgressPercentage(step)}% completed
              </p>
            </div>
          )}

          {/* Step 1: Welcome Page */}
          {step === 1 && (
            <div className="text-center space-y-6 relative z-20">
              <h2 className="text-2xl font-bold">
                Welcome to CHC Patient Platform
              </h2>
              <p className="text-sm text-gray-300">
                Let’s get you set up. Click below to begin filling out your
                details.
              </p>
              <img
                src="/chc-banner.png"
                className="w-full h-fit md:object-cover rounded-lg object-contain"
                alt=""
              />
              <Button
                onClick={() => setStep(2)}
                type="button"
                size={"lg"}
                className="bg-blue-600 font-semibold w-full md:w-1/2 md:text-lg"
              >
                Get Started
              </Button>
              <p className="mt-6 text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-400 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <>
              <h2 className="font-semibold tracking-tight text-lg">
                Personal Details
              </h2>
              {[
                ["First Name", "first_name", "text", "e.g. John"],
                ["Last Name", "last_name", "text", "e.g. Doe"],
                ["Email", "email", "email", "e.g. johndoe@gmail.com"],
                ["Phone", "phone", "text", "0903-322-827"],
                ["Date of Birth", "date_of_birth", "date"],
              ].map(([label, name, type = "text", placeholder]) => (
                <div key={name} className="space-y-2">
                  <Label className="font-semibold">{label}</Label>
                  <Input
                    type={type}
                    {...register(name as keyof FormData)}
                    className="bg-transparent"
                    placeholder={placeholder}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div className="space-y-2">
                <Label className="font-semibold">Gender</Label>
                <select
                  {...register("gender")}
                  className="bg-transparent border-b w-full p-2 rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              {[
                ["Address", "address", "e.g. 123 Main St, Springfield"],
                ["Occupation", "occupation", "e.g. Software Engineer"],
                ["Emergency Contact Name", "emergencyName", "e.g. Jane Doe"],
                [
                  "Emergency Contact Number",
                  "emergencyNumber",
                  "e.g. 0803-456-7890",
                ],
                ["Blood Group", "bloodGroup", "e.g. O+ / A-"],
                ["Allergies", "allergies", "e.g. Peanuts, Penicillin"],
                ["Insurance Provider", "insurance", "e.g. HealthPlus or N/A"],
              ].map(([label, name, placeholder]) => (
                <div key={name} className="space-y-2">
                  <Label className="font-semibold">{label}</Label>
                  <Input
                    {...register(name as keyof FormData)}
                    className="bg-transparent"
                    placeholder={placeholder}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div className="flex justify-between md:gap-8">
                <Button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 font-semibold md:w-1/2"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 font-semibold z-20 md:w-1/2"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Password Setup */}
          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label className="font-semibold">Set Password</Label>
                <div className="flex">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="bg-transparent"
                  />
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
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Confirm Password</Label>
                <div className="flex">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="bg-transparent"
                  />
                  {showConfirmPassword ? (
                    <EyeClosed
                      onClick={() => setShowConfirmPassword(false)}
                      className="-translate-x-8"
                    />
                  ) : (
                    <Eye
                      onClick={() => setShowConfirmPassword(true)}
                      className="-translate-x-8"
                    />
                  )}
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between pt-8">
                <Button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 font-semibold"
                >
                  Back
                </Button>
                <Button type="submit" className="bg-green-700  font-semibold">
                  Create Account
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Registration Complete */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-green-400">
                Registration Complete 🎉
              </h2>
              <p className="text-gray-300 font-semibold">
                Your account has been successfully created. You can now access
                your dashboard.
              </p>
              <Link to="/dashboard">
                <Button className="bg-blue-600 font-semibold mt-8 w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          )}
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default SignUp;
