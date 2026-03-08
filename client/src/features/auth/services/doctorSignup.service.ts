import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";
import { useRouter } from "expo-router";
import { DoctorSignupData } from "../schemas/doctorSignupAuth.schema";
export function useDoctorSignupMutation() {
  const router = useRouter();
  return useMutationHandler({
    mutationFn: (data: DoctorSignupData) => {
      return request.post("/auth/doctor/signup", {
        ...data,
        visitFee: Number(data.visitFee),
      });
    },
    successMessage: {
      title: "Signup Successful",
      description:
        "Please wait for admin approval. You will be notified once your account is approved!",
    },
    showErrorToast: true,
    onSuccess() {
      router.replace("/(auth)/doctor/approval");
    },
  });
}
