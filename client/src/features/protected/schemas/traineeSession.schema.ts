import { z } from 'zod';

// --- Zod Schema ---
export const sessionSetupSchema = z.object({
  discipline: z.enum(['BOXING', 'MMA', 'MUAY_THAI', 'BJJ'], {
    required_error: "Please select a discipline",
  }),
  pkg: z.string().min(1, "Please select a package"),
  timing: z.enum(['NOW', 'SCHEDULE']),
  scheduledDate: z.date().optional(), 
}).refine((data) => {
  // If timing is SCHEDULE, scheduledDate is required
  if (data.timing === 'SCHEDULE' && !data.scheduledDate) {
    return false;
  }
  return true;
}, {
  message: "Please select a date and time for your schedule",
  path: ["scheduledDate"],
});