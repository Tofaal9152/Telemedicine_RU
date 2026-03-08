import { z } from 'zod';

// --- Zod Schema ---
export const detailsSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  coupon: z.string().optional(),
  // Checkbox validation: must be true to proceed
  agreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms & Privacy policy." }),
  }),
});