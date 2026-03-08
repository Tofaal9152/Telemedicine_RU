import { useFetchData } from "@/hooks/useFetchData";

export const DOCTOR_USER_PROFILE = "doctor-user-profile";

export const useGetUserDoctor = () => {
  return useFetchData<any>({
    url: "/doctor/profile",
    querykey: [DOCTOR_USER_PROFILE],
  });
};
