import type { GetAuthMeResponse } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  auth?: GetAuthMeResponse;
  setAuth: (auth: GetAuthMeResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  setAuth: (auth) => set({ auth }),
  clearAuth: () => set({ auth: undefined }),
}));
