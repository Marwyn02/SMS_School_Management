import { getData, type TStudent } from "~/components/table/data";
import type { Route } from "../students/+types/view";

import Student from "~/pages/admin/students/view";
import Container from "app/components/ui/container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Student Detail" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type DataProps = {
  TStuden: string;
};

export async function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default async function AdminStudentsDetail({
  params,
}: Route.ComponentProps) {
  if (!params.studentId) {
    return <Container>Invalid student ID</Container>;
  }

  const studentData = (await getData()).find(
    (item: TStudent) => item.id === params.studentId
  );

  if (!studentData) {
    return <Container>Student not found</Container>;
  }

  return <Student data={studentData} />;
}
