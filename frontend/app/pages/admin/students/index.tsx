import { data, Link } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import BasicTable from "app/components/table/BasicTable";
import Container from "app/components/ui/container";

import { getData, type TStudent } from "app/components/table/data";
import { useState, useEffect } from "react";

const columns: ColumnDef<TStudent>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "year",
    header: "Year Level",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/dashboard/students/${student.id}/profile`}>
              <DropdownMenuItem onClick={() => console.log("View", student.id)}>
                View
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => console.log("Edit", student.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete", student.id)}
              className="text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Students() {
  const [students, setStudents] = useState<TStudent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getData();

        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const getActiveStudents = students.filter((item) => item.status === "active");
  const getInactiveStudents = students.filter(
    (item) => item.status === "inactive"
  );
  const getPendingStudents = students.filter(
    (item) => item.status === "pending"
  );
  const getGraduatedStudents = students.filter(
    (item) => item.status === "graduated"
  );

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <Container>
      <h1 className="text-2xl font-bold">Student Page</h1>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-sm">
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Student</p>
          <p>{students.length}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Active Students</p>
          <p>{getActiveStudents.length}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Graduated Students</p>
          <p>{getGraduatedStudents.length}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Pending Students</p>
          <p>{getPendingStudents.length}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Inactive Students</p>
          <p>{getInactiveStudents.length}</p>
        </div>
      </section>

      <div>
        <BasicTable columns={columns} data={students} />
      </div>
    </Container>
  );
}
