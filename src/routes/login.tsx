import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginContainer from "@/features/login";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  loader: () => {
    const token = localStorage.getItem("token");
    if (token) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <LoginContainer />;
}
