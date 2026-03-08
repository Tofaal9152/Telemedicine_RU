import { z } from "zod";

// --- Validation Schema ---

export const doctorSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["male", "female"]),
  specialty: z.string().min(2, "Specialty must be at least 2 characters"),
  experience: z.string().min(2, "Experience must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  visitFee: z.string().min(1, "Visit Fee is required"),
  registrationNumber: z.string().min(1, "Registration Number is required"),
});
export type DoctorSignupData = z.infer<typeof doctorSignupSchema>;
