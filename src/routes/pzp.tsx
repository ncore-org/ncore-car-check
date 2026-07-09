import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/pzp")({
  component: () => <Outlet />,
});