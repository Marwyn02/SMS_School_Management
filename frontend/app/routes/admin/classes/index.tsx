import { ProtectedRoute } from "~/protection/ProtectedRoute";
import type { Route } from "../classes/+types/index";
import Class from "~/pages/admin/classes/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Classes Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminTeachersDashboard() {
  return (
    <ProtectedRoute>
      <Class />
    </ProtectedRoute>
  );
}
