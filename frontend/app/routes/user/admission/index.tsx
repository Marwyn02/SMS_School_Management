import type { Route } from "./+types/index";
import Admission from "app/pages/user/admission";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission - Step 1" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function UserAdmissionStep1() {
  return <Admission />;
}
