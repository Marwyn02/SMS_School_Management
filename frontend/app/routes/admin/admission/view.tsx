import { useParams } from "react-router";
import type { Route } from "../admission/+types/view";
import Container from "~/components/ui/container";
import Admission from "~/pages/admin/admission/view";
import { ProtectedRoute } from "~/protection/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission Detail" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminTeachersDashboard() {
  const { admissionId } = useParams();

  if (!admissionId) {
    return (
      <ProtectedRoute>
        <Container>Invalid student ID</Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Admission admissionId={admissionId} />
    </ProtectedRoute>
  );
}
