import { z } from 'zod';

// --- Zod Schema ---
export const sessionLogSchema = z.object({
  selectedActivities: z.array(z.string()).min(1, "Select at least one activity"),
  notes: z.string().optional(),
  homework: z.string().optional(),
  selectedDiet: z.string().min(1, "Select a diet suggestion"),
});