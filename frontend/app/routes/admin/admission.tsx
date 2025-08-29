import type { Route } from "../admin/+types/admission";
import Admission from "~/pages/admin/Admission";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission Admin Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminAdmissionDashboard() {
  return <Admission />;
}
