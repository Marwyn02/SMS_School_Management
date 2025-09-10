import BasicTable from "~/components/table/BasicTable";
import type { ColumnDef } from "@tanstack/react-table";
import {
  getAdmission,
  getData,
  getTeachers,
  type TAdmission,
  type TStudent,
  type TTeachers,
} from "~/components/table/data";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { Button } from "app/components/ui/button";
import { Container, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";

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
            <Link to={`/dashboard/students/${student.id}`}>
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

export default function Dashboard() {
  const [students, setStudents] = useState<TStudent[]>([]);
  const [teachers, setTeachers] = useState<TTeachers[]>([]);
  const [applicants, setApplicants] = useState<TAdmission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, teachersData, applicantsData] = await Promise.all([
          getData(),
          getTeachers(),
          getAdmission(),
        ]);

        setStudents(studentsData);
        setTeachers(teachersData);
        setApplicants(applicantsData);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <main className="container mx-auto px-4 pt-28 pb-5 lg:pt-32 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 text-sm">
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Student</p>
          <p>{students.length}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Teacher</p>
          <p>{teachers.length}</p>
        </div>
        <div className="border p-3 rounded-md">
          <p className="font-semibold">Total Applicants</p>
          <p>{applicants.length}</p>
        </div>
      </section>

      <BasicTable columns={columns} data={students} />
    </main>
  );
}
