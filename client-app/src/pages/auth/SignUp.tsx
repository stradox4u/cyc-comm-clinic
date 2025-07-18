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
        "emergency_contact",
        "emergency_contact_number",
        "blood_group",
        "allergies",
        "insurance_coverage",
        "insurance_provider_id",
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
          className="text-white space-y-6 z-20"
        >
          {/* Step Indicator */}
          {/* Progress Bar & Step Text - Hidden on Welcome Page */}
          {step !== 1 && (
            <div className="flex gap-4 items-center">
              <div className="w-full bg-[#6A5CA3]/30 rounded h-1.5 overflow-hidden">
                <div
                  className="bg-[#6A5CA3] h-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(step)}%` }}
                />
              </div>
              <p className="text-xs text-black font-semibold text-nowrap">
                {getProgressPercentage(step)}% completed
              </p>
            </div>
          )}

          {/* Step 1: Welcome Page */}
          {step === 1 && (
            <div className="text-center space-y-6 relative z-20 text-black">
              <h2 className="text-2xl font-semibold">
                Welcome to CHC Patient Platform
              </h2>
              <p className="text-sm text-gray-800">
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
                className="bg-[#6A5CA3] font-semibold w-1/2 md:w-1/2 md:text-lg"
              >
                Get Started
              </Button>
              <p className="mt-6 text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="text-purple-400 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <div className="text-black">
              <h2 className="font-semibold tracking-tight mb-8 text-lg">
                Personal Details
              </h2>
              <div className="">
                {[
                  ["First Name", "first_name", "text", "e.g. John"],
                  ["Last Name", "last_name", "text", "e.g. Doe"],
                  ["Email", "email", "email", "e.g. johndoe@gmail.com"],
                  ["Phone", "phone", "text", "0903-322-827"],
                  ["Date of Birth", "date_of_birth", "date"],
                ].map(([label, name, type = "text", placeholder]) => (
                  <div key={name} className="space-y-2 my-4">
                    <Label className="font-semibold">{label}</Label>
                    <Input
                      type={type}
                      {...register(name as keyof FormData)}
                      className="py-6"
                      placeholder={placeholder}
                    />
                    {errors[name as keyof FormData] && (
                      <p className="text-red-500 text-sm">
                        {errors[name as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Gender</Label>
                <select
                  {...register("gender")}
                  className="bg-black text-white border-b w-full p-2 rounded"
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
                [
                  "Emergency Contact Name",
                  "emergency_contact",
                  "e.g. Jane Doe",
                ],
                [
                  "Emergency Contact Number",
                  "emergency_contact_number",
                  "e.g. 0803-456-7890",
                ],
                ["Blood Group", "blood_group", "e.g. O+ / A-"],
                ["Allergies", "allergies", "e.g. Peanuts, Penicillin"],
                [
                  "Insurance Coverage",
                  "insurance_coverage",
                  "e.g. HealthPlus or N/A",
                ],
                ["Insurance Provider", "insurance_provider_id", "e.g. 362HGSD"],
              ].map(([label, name, placeholder]) => (
                <div key={name} className="space-y-2 my-4">
                  <Label className="font-semibold">{label}</Label>
                  <Input
                    {...register(name as keyof FormData)}
                    className="py-6"
                    placeholder={placeholder}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div className="flex justify-between md:gap-8 my-6">
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
                  className="bg-[#6A5CA3] hover:bg-[#6A5CA3]/30 font-semibold z-20 md:w-1/2"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Password Setup */}
          {step === 3 && (
            <div className="text-black">
              <div className="space-y-2 my-4">
                <Label className="font-semibold">Set Password</Label>
                <div className="flex text-white items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="py-6"
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
              <div className="space-y-2 my-4">
                <Label className="font-semibold">Confirm Password</Label>
                <div className="flex text-white items-center">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="py-6"
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
                <Button
                  type="submit"
                  className="bg-[#6A5CA3]  font-semibold hover:bg-[#6A5CA3]/60"
                >
                  Create Account
                </Button>
              </div>
            </div>
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
      {/* Security Notice */}
      {/* <Card className="bg-green-50 border-green-200 absolute max-w-[34rem] w-full bottom-12 left-52">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="text-sm">
              <h4 className="font-medium text-green-900">
                Your Privacy is Protected
              </h4>
              <p className="text-green-700 mt-1">
                We use industry-standard encryption to protect your personal and
                health information. Your data is never shared without your
                explicit consent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </AuthLayout>
  );
};

export default SignUp;
