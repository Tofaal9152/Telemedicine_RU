import { z } from "zod";

// --- Validation Schema ---
export const patientSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["male", "female"]),
});
export type PatientSignupData = z.infer<typeof patientSignupSchema>;
