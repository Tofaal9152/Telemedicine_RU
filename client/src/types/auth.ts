export type UserState = {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  role: string | null;
  otpCountdownStartedAt: number | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
  setRole: (role: string | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setOtpCountdownStartedAt: (timestamp: number | null) => void;
  reset: () => void;

};
