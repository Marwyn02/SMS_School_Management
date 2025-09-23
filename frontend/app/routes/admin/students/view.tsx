import type { Route } from "../students/+types/view";

import Student from "~/pages/admin/students/view";
import Container from "app/components/ui/container";
import { useParams } from "react-router";
import { ProtectedRoute } from "~/protection/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Student Detail" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default function AdminStudentsDetail() {
  const { studentId } = useParams();

  if (!studentId) {
    return (
      <ProtectedRoute>
        <Container>Invalid student ID</Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Student studentId={studentId} />
    </ProtectedRoute>
  );
}
