import { z } from "zod";

// --- Zod Schema for Validation ---
export const scheduleSchema = z.object({
  date: z.date({ required_error: "Please select a date." }),
  sessionTimeId: z.string().min(1, "Please select a session time."),
  slotType: z.string().min(1, "Please select a slot type."),
});