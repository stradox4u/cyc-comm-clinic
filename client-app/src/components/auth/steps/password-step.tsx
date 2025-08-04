import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CheckSquare, Eye, EyeClosed } from "lucide-react";
import type { FormData } from "../../../lib/schema";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Link } from "react-router-dom";

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

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [allowCommunications, setAllowCommunications] = useState(false);

  const [checkErrors, setCheckErrors] = useState<{
    agreeToTerms?: string;
    agreeToPrivacy?: string;
  }>({});

  // const handleSubmit = () => {
  //   if (!agreeToTerms) {
  //     checkErrors.agreeToTerms = "You must agree to the Terms of Service.";
  //   }

  //   if (!agreeToPrivacy) {
  //     checkErrors.agreeToPrivacy = "You must agree to the Privacy Policy.";
  //   }

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length > 0) {
  //     return; // prevent submit
  //   }

  //   // Proceed with form submission

  //   // submit payload
  // };

  return (
    <div className="text-black">
      <h2 className="font-semibold tracking-tight mb-8 text-lg">
        Secure Your Account
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="font-semibold">Set Password</Label>
          <div className="flex text-white items-center">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="bg-background/20"
              placeholder="Enter your password"
            />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(false)}
                className="-translate-x-8 cursor-pointer"
              />
            ) : (
              <EyeClosed
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
              className="bg-background/20"
              placeholder="Confirm your password"
            />
            {showConfirmPassword ? (
              <Eye
                onClick={() => setShowConfirmPassword(false)}
                className="-translate-x-8 cursor-pointer"
              />
            ) : (
              <EyeClosed
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

        <div className="space-y-4 border-t pt-4 border-muted-foreground/20">
          {/* Terms of Service */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(Boolean(checked))}
              className={checkErrors.agreeToTerms ? "border-red-500" : ""}
            />
            <Label htmlFor="agreeToTerms" className="text-sm leading-5">
              I agree to the{" "}
              <Link to="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{" "}
              *
            </Label>
          </div>
          {checkErrors.agreeToTerms && (
            <p className="text-sm text-red-500">{checkErrors.agreeToTerms}</p>
          )}

          {/* Privacy Policy */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToPrivacy"
              checked={agreeToPrivacy}
              onCheckedChange={(checked) => setAgreeToPrivacy(Boolean(checked))}
              className={checkErrors.agreeToPrivacy ? "border-red-500" : ""}
            />
            <Label htmlFor="agreeToPrivacy" className="text-sm leading-5">
              I agree to the{" "}
              <Link to="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>{" "}
              and consent to the collection and use of my health information *
            </Label>
          </div>
          {checkErrors.agreeToPrivacy && (
            <p className="text-sm text-red-500">{checkErrors.agreeToPrivacy}</p>
          )}

          {/* Communications */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="allowCommunications"
              checked={allowCommunications}
              onCheckedChange={(checked) =>
                setAllowCommunications(Boolean(checked))
              }
            />
            <Label htmlFor="allowCommunications" className="text-sm leading-5">
              I would like to receive appointment reminders, health tips, and
              other communications via email and SMS
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 w-full gap-12">
        <Button
          type="button"
          onClick={onPrev}
          className="bg-gray-600 font-semibold w-full"
          disabled={isSubmitting}
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="bg-[#6A5CA3] font-semibold hover:bg-[#6A5CA3]/60 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Creating Account..."
          ) : (
            <>
              Create Account <CheckSquare />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasswordStep;
