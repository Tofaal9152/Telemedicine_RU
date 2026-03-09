import { z } from "zod";

// --- Validation Schema ---

export const paymentSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
});
export type PaymentData = z.infer<typeof paymentSchema>;
