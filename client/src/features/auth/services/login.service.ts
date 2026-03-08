import { useMutationHandler } from "@/hooks/useMutationHandler";
import { request } from "@/lib/request";
import { useAuthStore } from "@/store/authStore";
import { LoginData } from "../schemas/login.schema";
export function useLoginMutation() {
  const setRole = useAuthStore((s) => s.setRole);
  const setIsLoggedIn = useAuthStore((s) => s.setIsLoggedIn);
  const setToken = useAuthStore((s) => s.setToken);
  return useMutationHandler({
    mutationFn: (data: LoginData) => {
      return request.post("/auth/login/", {
        email: data.email,
        password: data.password,
      });
    },
    successMessage: {
      title: "Login Successful",
      description: "You have been logged in successfully!",
    },
    showErrorToast: true,
    onSuccess: (response: any) => {
      const { user, accessToken } = response.data;
      setRole(user.role.toLowerCase());
      setToken(accessToken);
      setIsLoggedIn(true);
    },
  });
}
