import Dashboard from "~/pages/admin/Dashboard";
import type { Route } from "./admin/+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminDashboard() {
  return <Dashboard />;
}
