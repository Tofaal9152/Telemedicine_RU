import { z } from "zod";

// --- Zod Schema ---
export const fighterSchema = z.object({
  photoUri: z.string().optional().nullable(),
  height: z.string().min(1, "Height is required").refine((val) => !isNaN(Number(val)), "Must be a number"),
  weight: z.string().min(1, "Weight is required").refine((val) => !isNaN(Number(val)), "Must be a number"),
  age: z.string().min(1, "Age is required").refine((val) => !isNaN(Number(val)), "Must be a number"),
  gender: z.string().min(1, "Please select a gender"),
  primaryGoal: z.string().min(1, "Please select a primary goal"),
});