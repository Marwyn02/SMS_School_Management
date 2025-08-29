import type { Route } from "../admin/+types/students";
import Student from "~/pages/admin/Student";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Student Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminStudentsDashboard() {
  return <Student />;
}
