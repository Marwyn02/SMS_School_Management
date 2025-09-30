import Admission from "~/pages/admin/admission/index";
import type { Route } from "../admission/+types/index";
import { ProtectedRoute } from "~/protection/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminAdmissionDashboard() {
  return (
    <ProtectedRoute>
      <Admission />
    </ProtectedRoute>
  );
}
