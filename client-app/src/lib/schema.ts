import * as z from "zod";

export const personalSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(11, "Phone is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "NULL"], "Gender is required"),
  address: z.string().min(1, "Address is required"),
  occupation: z.string().optional(),
  emergency_contact_name: z
    .string()
    .min(1, "Emergency contact name is required"),
  emergency_contact_phone: z.string().min(1, "Emergency contact is required"),
  blood_group: z.string().min(1, "Blood group is required"),
  allergies: z.string().optional(),
  insurance_coverage: z.string().min(1, "Insurance coverage is required"),
  insurance_provider_id: z.string().optional(),
});

export const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const fullSchema = personalSchema.extend(passwordSchema.shape);
export type FormData = z.infer<typeof fullSchema>;

const isEmail = (val: string) => {
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(val);
};

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").refine(isEmail, {
    message: "Enter a valid email",
  }),
  password: z.string().min(1, "Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    otp: z.string().min(1, "OTP is required"),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
