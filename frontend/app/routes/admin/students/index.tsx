import type { Route } from "../students/+types/index";
import Student from "~/pages/admin/students/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Student Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminStudentsDashboard() {
  return <Student />;
}
