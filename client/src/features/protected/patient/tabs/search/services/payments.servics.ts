import { Linking } from "react-native";
import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";
import { PaymentData } from "../schemas/payments.schema";
import { useRouter } from "expo-router";

export function usePaymentMutation() {
  const router = useRouter();
  return useMutationHandler({
    mutationFn: (data: PaymentData) => {
      return request.post("/appointments/payment", {
        doctorId: data.doctorId,
      });
    },
    showErrorToast: true,
    showSuccessToast: false,
    async onSuccess(data: any) {
      const paymentUrl = data?.payment_url;

      if (!paymentUrl) return;

      router.push(
        `/appointment/payment?paymentUrl=${encodeURIComponent(paymentUrl)}`,
      );
    },
  });
}
