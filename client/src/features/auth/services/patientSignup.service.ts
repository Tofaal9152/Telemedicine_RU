import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";
import { useRouter } from "expo-router";
import { PatientSignupData } from "../schemas/patientSignupAuth.schema";
export function usePatientSignupMutation() {
  const router = useRouter();
  return useMutationHandler({
    mutationFn: (data: PatientSignupData) => {
      return request.post("/auth/patient/signup", {
        ...data,
      });
    },
    successMessage: {
      title: "Signup Successful",
      description: "You have been signed up successfully!",
    },
    showErrorToast: true,
    onSuccess() {
      router.replace("/(auth)/login");
    },
  });
}
