import type { Route } from "../teachers/+types/view";

import Teacher from "app/pages/admin/teachers/view";
import Container from "app/components/ui/container";
import { useParams } from "react-router";

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
    return <Container>Invalid teacher ID</Container>;
  }

  return <Teacher teacherId={teacherId} />;
}
