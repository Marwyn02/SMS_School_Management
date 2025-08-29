import type { Route } from "./+types/home";
import LoginForm from "~/pages/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return <LoginForm />;
}
