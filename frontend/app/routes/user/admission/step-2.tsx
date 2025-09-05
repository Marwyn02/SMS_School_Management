import Admission from "app/pages/user/admission/Step2";
import type { Route } from "./+types/step-2";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission - Step 2" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function UserAdmissionStep2() {
  return <Admission />;
}
