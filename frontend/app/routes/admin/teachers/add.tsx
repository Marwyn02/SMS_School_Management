import type { Route } from "../teachers/+types/add";
import AddTeachers from "~/pages/admin/teachers/add";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Teachers Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminAddTeachersDashboard() {
  return <AddTeachers />;
}
