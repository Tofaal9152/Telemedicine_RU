import { useFetchData } from "@/hooks/useFetchData";
import { makeEndpoint } from "@/utils/makeEndpoint";

export const DOCTOR_APPOINTMENTS = "doctor-appointments";

export const useGetDoctorAppointments = ({
  query,
}: {
  query: {
    page: number;
  };
}) => {
  const endPoint = makeEndpoint(`/appointments/doctor/paid`, {
    p: query.page,
    limit: 10,
  });
  return useFetchData<any>({
    url: endPoint,
    querykey: [DOCTOR_APPOINTMENTS, query],
  });
};
