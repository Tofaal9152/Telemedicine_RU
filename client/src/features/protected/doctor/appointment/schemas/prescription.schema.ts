import { z } from "zod";

export const MedicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
});

export const CreatePrescriptionSchema = z.object({
  symptoms: z.string().min(1, "Symptoms are required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  notes: z.string().min(1, "Notes are required"),
  medications: z
    .array(MedicationSchema)
    .min(1, "At least one medication is required"),
});

export type CreatePrescriptionData = z.infer<typeof CreatePrescriptionSchema>;
