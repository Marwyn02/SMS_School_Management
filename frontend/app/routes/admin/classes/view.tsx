import { useParams } from "react-router";
import type { Route } from "../classes/+types/view";
import Class from "~/pages/admin/classes/view";
import Container from "~/components/ui/container";
import { ProtectedRoute } from "~/protection/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Class" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminTeachersDashboard() {
  const { classId } = useParams();

  if (!classId) {
    return (
      <ProtectedRoute>
        <Container>Invalid class number</Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Class classId={classId} />
    </ProtectedRoute>
  );
}
