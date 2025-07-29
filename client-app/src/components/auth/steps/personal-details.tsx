import { useFormContext } from "react-hook-form";

import type { FormData } from "../../../lib/schema";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PersonalDetailsStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

type InsuranceProvider = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

const PersonalDetailsStep = ({ onNext, onPrev }: PersonalDetailsStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  const [insuranceProviders, setInsuranceProviders] = useState<
    InsuranceProvider[]
  >([]);
  const [loading, setLoading] = useState(false);

  const personalFields = [
    ["First Name", "first_name", "text", "e.g. John"],
    ["Last Name", "last_name", "text", "e.g. Doe"],
    ["Email", "email", "email", "e.g. johndoe@gmail.com"],
    ["Phone", "phone", "text", "0903-322-827"],
    ["Date of Birth", "date_of_birth", "date"],
  ];

  const additionalFields = [
    ["Address", "address", "e.g. 123 Main St, Springfield"],
    ["Occupation", "occupation", "e.g. Software Engineer"],
    ["Emergency Contact Name", "emergency_contact_name", "e.g. Jane Doe"],
    [
      "Emergency Contact Phone",
      "emergency_contact_phone",
      "e.g. 0803-456-7890",
    ],
    ["Allergies", "allergies", "e.g. Peanuts, Penicillin"],
    [
      "Insurance Coverage",
      "insurance_coverage",
      "e.g. Basic Health Package or N/A",
    ],
  ];

  useEffect(() => {
    const fetchInsuranceProvider = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/insurance-providers");

        // Ensure response is ok and content-type is JSON
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid response");
        }

        const result = await response.json();

        if (!result.success) {
          toast.error("Error fetching providers");
        } else {
          setInsuranceProviders(result.data);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        toast.error("Failed to fetch insurance providers.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsuranceProvider();
  }, []);

  return (
    <div className="text-black">
      <h2 className="font-semibold tracking-tight mb-8 text-lg">
        Personal Details
      </h2>

      <div className="space-y-4">
        {personalFields.map(([label, name, type = "text", placeholder]) => (
          <div key={name} className="space-y-2">
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

        <div className="space-y-2">
          <Label className="font-semibold">Gender</Label>
          <select
            {...register("gender")}
            className="bg-black text-white border-b w-full p-2 rounded"
          >
            <option value="">-- Select Gender --</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="NULL">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Gender</Label>
          <select
            {...register("blood_group")}
            className="bg-black text-white border-b w-full p-2 rounded"
          >
            <option value="">-- Select Blood Group --</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.blood_group && (
            <p className="text-red-500 text-sm">{errors.blood_group.message}</p>
          )}
        </div>

        {additionalFields.map(([label, name, placeholder]) => (
          <div key={name} className="space-y-2">
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

        <div className="space-y-2">
          <Label className="font-semibold">Insurance Provider</Label>

          {loading ? (
            <div className="w-full">
              <div className="h-10 rounded bg-zinc-700 animate-pulse" />
            </div>
          ) : (
            <select
              {...register("insurance_provider_id")}
              className="bg-black text-white border-b w-full p-2 rounded"
            >
              <option value="">-- Select Insurance Provider --</option>
              {insuranceProviders.map((insurance) => (
                <option key={insurance.id} value={insurance.id}>
                  {insurance.name}
                </option>
              ))}
            </select>
          )}
          {errors.insurance_provider_id && (
            <p className="text-red-500 text-sm">
              {errors.insurance_provider_id.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between md:gap-8 my-6">
        <Button
          type="button"
          onClick={onPrev}
          className="bg-gray-600 font-semibold md:w-1/2"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-[#6A5CA3] hover:bg-[#6A5CA3]/30 font-semibold z-20 md:w-1/2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
