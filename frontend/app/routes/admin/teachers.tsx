import Teachers from "~/pages/admin/Teachers";
import type { Route } from "../admin/+types/teachers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teachers Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminTeachersDashboard() {
  return <Teachers />;
}
