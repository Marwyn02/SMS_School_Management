import Admission from "app/pages/user/admission/Step4";
import type { Route } from "./+types/step-4";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission - Step 4" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function UserAdmissionStep4() {
  return <Admission />;
}
