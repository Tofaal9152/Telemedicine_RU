import { useFetchData } from "@/hooks/useFetchData";

export const PATIENT_USER_PROFILE = "patient-user-profile";

export const useGetUser = () => {
  return useFetchData<any>({
    url: "/patient/profile",
    querykey: [PATIENT_USER_PROFILE],
  });
};
