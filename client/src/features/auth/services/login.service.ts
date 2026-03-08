import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";
import { useAuthStore } from "@/store/authStore";
import { LoginData } from "../schemas/login.schema";
import { showToast } from "@/hooks/useToast";

export function useLoginMutation() {
  return useMutationHandler({
    mutationFn: async (data: LoginData) => {
      const response: any = await request.post("/auth/signin", {
        ...data,
      });

      const result = response?.data ?? response;
      const { user } = result;

      if (user.role === "DOCTOR" && !user?.doctor?.isApproved) {
        throw new Error(
          "Your account is not approved yet. Please wait for approval.",
        );
      }

      return result;
    },

    showErrorToast: true,
    successMessage: {
      title: "Login Successful",
      description: "You have successfully logged in.",
    },
    onSuccess: (response: any) => {
      const { user, accessToken } = response;
      const { setRole, setIsLoggedIn, setToken } = useAuthStore.getState();

      setRole(user.role.toLowerCase());
      setToken(accessToken);
      setIsLoggedIn(true);
    },

    onError: (error: any) => {
      showToast({
        title: "Login Failed",
        description:
          error?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    },
  });
}
