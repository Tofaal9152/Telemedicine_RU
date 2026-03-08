import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToast } from "./useToast";

type UseMutationHandlerOptions<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData>;

  invalidateKeys?: QueryKey[]; //  multiple queries invalidate
  successMessage?: { title: string; description?: string };
  errorMessage?: { title: string; description?: string };

  showSuccessToast?: boolean;
  showErrorToast?: boolean;

  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

export function useMutationHandler<TData, TVariables>({
  mutationFn,
  invalidateKeys,
  successMessage,
  errorMessage,
  showSuccessToast = true,
  showErrorToast = true,
  onSuccess,
  onError,
}: UseMutationHandlerOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError<any>, TVariables>({
    mutationFn,

    onSuccess: async (data) => {
      //  invalidate multiple queries
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        );
      }

      if (showSuccessToast && successMessage) {
        showToast({ type: "success", ...successMessage });
      }

      onSuccess?.(data);
    },

    onError: (error) => {
      // error te string kore dekhau
      console.log(error)
      const msg =
        error.response?.data?.message ||
        errorMessage?.description ||
        "Something went wrong";

      if (showErrorToast) {
        showToast({
          type: "error",
          title: errorMessage?.title || "Action Failed",
          description: msg,
        });
      }

      onError?.(error);
    },
  });
}
