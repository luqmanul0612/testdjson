import LayoutComponent from "@/components/layout-component";
import { useAuthStore } from "@/stores/auth";
import { getAuthMe } from "@/utils/api/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Spin } from "antd";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
  loader: async () => {
    try {
      const res = await getAuthMe();
      if (res.data?.username) {
        useAuthStore.setState({ auth: res.data });
      }
    } catch (err: any) {}
  },
  pendingMs: 0,
  pendingComponent: () => (
    <div style={{ width: "100dvw", height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spin size="large" />
    </div>
  ),
});

function RouteComponent() {
  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
}
