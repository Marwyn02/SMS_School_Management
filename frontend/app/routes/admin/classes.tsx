import type { Route } from "../admin/+types/classes";
import Class from "~/pages/admin/Class";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Classes Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminTeachersDashboard() {
  return <Class />;
}
