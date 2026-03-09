import { useFetchData } from "@/hooks/useFetchData";
import { makeEndpoint } from "@/utils/makeEndpoint";

export const PATIENT_APPOINTMENTS = "patient-appointments";

export const useGetAppointments = ({
  query,
}: {
  query: {
    page: number;
  };
}) => {
  const endPoint = makeEndpoint(`/appointments/patient/paid`, {
    p: query.page,
    limit: 10,
  });
  return useFetchData<any>({
    url: endPoint,
    querykey: [PATIENT_APPOINTMENTS, query],
  });
};
