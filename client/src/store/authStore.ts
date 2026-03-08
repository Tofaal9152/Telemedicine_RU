import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { secureStorage } from "../lib/secureStorage"; // Import your new wrapper
import { UserState } from "../types/auth";

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userId: null,
      token: null,
      role: null,
      otpCountdownStartedAt: null,
      notificationToken: null,
      paymentStatus: null,

      setToken: (token) => set({ token }),
      setUserId: (userId) => set({ userId }),
      setRole: (role) => set({ role }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setOtpCountdownStartedAt: (timestamp) =>
        set({ otpCountdownStartedAt: timestamp }),

      reset: () =>
        set({
          isLoggedIn: false,
          token: null,
          role: null,
          otpCountdownStartedAt: null,

          userId: null,
        }),
    }),
    {
      name: "auth-store",
      // Use createJSONStorage for async storage engines like SecureStore
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
