import Teachers from "~/pages/admin/teachers";
import type { Route } from "../teachers/+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teachers Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminTeachersDashboard() {
  return <Teachers />;
}
