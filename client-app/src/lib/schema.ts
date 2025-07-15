import * as z from "zod";

export const personalSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(11, "Phone is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  occupation: z.string().min(1, "Occupation is required"),
  emergencyName: z.string().min(1, "Emergency contact name is required"),
  emergencyNumber: z.string().min(1, "Emergency number is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  allergies: z.array(z.string()).optional(),
  insurance: z.string().min(1, "Insurance is required"),
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

export const loginSchema = z.object({
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
  password: z.string().min(1, "Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;
