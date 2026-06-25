import ProductContainer from "@/features/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/product")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductContainer />;
}
