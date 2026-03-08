import { z } from 'zod';

// --- Zod Schema ---
export const trainerSetupSchema = z.object({
  photoUri: z.string().optional(),
  fightingStyle: z.string().refine(val => val !== 'Select', { message: "Please select a fighting style" }),
  experience: z.string().min(1, "Experience is required").refine(val => !isNaN(Number(val)), "Must be a number"),
  hourlyRate: z.string().min(1, "Rate is required").refine(val => !isNaN(Number(val)), "Must be a number"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  selectedDays: z.array(z.string()).min(1, "Select at least one available day"),
  startTime: z.date(),
  endTime: z.date(),
});