import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),

  route("admission/step-1", "routes/user/admission/index.tsx"),
  route("admission/step-2", "routes/user/admission/step-2.tsx"),
  route("admission/step-3", "routes/user/admission/step-3.tsx"),
  route("admission/step-4", "routes/user/admission/step-4.tsx"),

  route("dashboard", "routes/admin/index.tsx"),

  route("dashboard/students", "routes/admin/students.tsx"),

  route("dashboard/teachers", "routes/admin/teachers/index.tsx"),
  route("dashboard/teachers/add", "routes/admin/teachers/add.tsx"),

  route("dashboard/classes", "routes/admin/classes.tsx"),

  route("dashboard/admission", "routes/admin/admission.tsx"),
] satisfies RouteConfig;
