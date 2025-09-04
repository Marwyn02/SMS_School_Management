import { NavLink, useLocation } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";

export default function AdminNav() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="bg-gray-100 flex items-center justify-between space-x-2 py-4 px-4">
        <a href="/" className="font-bold">
          Logo
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="h-8 w-8 rounded-full bg-gray-400"></p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <section>
        <div className="bg-gray-200 flex items-center justify-start space-x-5 py-2 px-4 text-sm overflow-x-auto">
          <NavLink
            to={"/dashboard"}
            className={location.pathname === "/dashboard" ? "font-bold" : ""}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/students"
            className={
              location.pathname === "/dashboard/students" ? "font-bold" : ""
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/dashboard/admission"
            className={
              location.pathname === "/dashboard/admission" ? "font-bold" : ""
            }
          >
            Admission
          </NavLink>
          <NavLink
            to="/dashboard/teachers"
            className={
              location.pathname === "/dashboard/teachers" ? "font-bold" : ""
            }
          >
            Teachers
          </NavLink>
          <NavLink
            to="/dashboard/classes"
            className={
              location.pathname === "/dashboard/classes" ? "font-bold" : ""
            }
          >
            Classes
          </NavLink>
        </div>
      </section>
    </nav>
  );
}
