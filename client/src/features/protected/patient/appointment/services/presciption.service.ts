// {{baseUrl}}/prescription/appointment/cmmjiy48j0007dqi08wy95ov2

import { useFetchData } from "@/hooks/useFetchData";

export const PRESCRIPTION = "patient-prescription";

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
