import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Eye, EyeClosed } from "lucide-react";
import type { FormData } from "../../../lib/schema";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface PasswordStepProps {
  onNext: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

const PasswordStep = ({ onPrev, isSubmitting }: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="text-black">
      <h2 className="font-semibold tracking-tight mb-8 text-lg">
        Set Your Password
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="font-semibold">Set Password</Label>
          <div className="flex text-white items-center">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="py-6"
              placeholder="Enter your password"
            />
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

        <div className="space-y-2">
          <Label className="font-semibold">Confirm Password</Label>
          <div className="flex text-white items-center">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="py-6"
              placeholder="Confirm your password"
            />
            {showConfirmPassword ? (
              <EyeClosed
                onClick={() => setShowConfirmPassword(false)}
                className="-translate-x-8 cursor-pointer"
              />
            ) : (
              <Eye
                onClick={() => setShowConfirmPassword(true)}
                className="-translate-x-8 cursor-pointer"
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          type="button"
          onClick={onPrev}
          className="bg-gray-600 font-semibold"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-[#6A5CA3] font-semibold hover:bg-[#6A5CA3]/60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </div>
  );
};

export default PasswordStep;
