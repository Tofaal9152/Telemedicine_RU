import { useFetchData } from "@/hooks/useFetchData";

export const useGetAppointmentById = ({
  appointmentId,
}: {
  appointmentId: string;
}) => {
  console.log(appointmentId);
  return useFetchData<any>({
    url: `/appointments/${appointmentId}`,
    querykey: ["appointment", appointmentId],
    options: {
      enabled: !!appointmentId,
    },
  });
};
