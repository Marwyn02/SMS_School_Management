import type { Route } from "../teachers/+types/view";

import Teacher from "app/pages/admin/teachers/view";
import Container from "app/components/ui/container";
import { useParams } from "react-router";
import { ProtectedRoute } from "~/protection/ProtectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teacher Detail" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default function AdminTeachersDetail() {
  const { teacherId } = useParams();

  if (!teacherId) {
    return (
      <ProtectedRoute>
        <Container>Invalid teacher ID</Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Teacher teacherId={teacherId} />
    </ProtectedRoute>
  );
}
