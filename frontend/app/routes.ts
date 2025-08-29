import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/admin/index.tsx"),
  route("dashboard/students", "routes/admin/students.tsx"),
  route("dashboard/teachers", "routes/admin/teachers.tsx"),
  route("dashboard/classes", "routes/admin/classes.tsx"),
  route("dashboard/admission", "routes/admin/admission.tsx"),
] satisfies RouteConfig;
