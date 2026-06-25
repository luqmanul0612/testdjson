import { router } from "@/lib/router";
import { useAuthStore } from "@/stores/auth";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  useAuthStore.getState().clearAuth();
  router.navigate({ to: "/login", replace: true });
};
