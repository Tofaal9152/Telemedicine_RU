// {{baseUrl}}/prescription/appointment/cmmjiy48j0007dqi08wy95ov2
import { useFetchData } from "@/hooks/useFetchData";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";
import { CreatePrescriptionData } from "../schemas/prescription.schema";
import { showToast } from "@/hooks/useToast";

export const PRESCRIPTION = "doctor-prescription";

export const useGetPrescription = ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  return useFetchData<any>({
    url: `/prescription/appointment/${appointmentId}`,
    querykey: [PRESCRIPTION, appointmentId],
  });
};

export function useCreateOrUpdatePrescriptionMutation({
  isEdit = false,
  prescriptionId,
  appointmentId,
  patientId,
  doctorId,
}: {
  isEdit: boolean;
  prescriptionId?: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
}) {
  return useMutationHandler({
    mutationFn: async (data: CreatePrescriptionData) => {
      const patload = {
        appointmentId,
        patientId,
        doctorId,
        symptoms: data.symptoms,
        diagnosis: data.diagnosis,
        medications: data.medications.map((med) => ({
          name: med.name,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
        })),
        notes: data.notes,
      };
      if (!appointmentId || !patientId || !doctorId) {
        return showToast({
          title: "Missing Required Fields",
          description:
            "Appointment ID, Patient ID, and Doctor ID are required.",
          type: "error",
        });
      }
      return isEdit
        ? request.patch(`/prescription/${prescriptionId}`, patload)
        : request.post("/prescription", patload);
    },
    invalidateKeys: [[PRESCRIPTION]],

    showErrorToast: true,
    successMessage: {
      title: isEdit ? "Prescription Updated" : "Prescription Created",
      description: isEdit
        ? "Prescription has been updated successfully."
        : "Prescription has been created successfully.",
    },
  });
}
export function useDeletePrescription({
  prescriptionId,
}: {
  prescriptionId?: string;
}) {
  return useMutationHandler({
    mutationFn: async () => {
      return request.delete(`/prescription/${prescriptionId}`);
    },
    invalidateKeys: [[PRESCRIPTION]],

    showErrorToast: true,
    successMessage: {
      title: "Prescription Deleted",
      description: "Prescription has been deleted successfully.",
    },
  });
}
