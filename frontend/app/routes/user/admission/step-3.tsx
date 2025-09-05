import Admission from "app/pages/user/admission/Step3";
import type { Route } from "./+types/step-3";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admission - Step 3" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function UserAdmissionStep3() {
  return <Admission />;
}
