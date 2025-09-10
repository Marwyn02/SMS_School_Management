import BasicTable from "~/components/table/BasicTable";
import type { ColumnDef } from "@tanstack/react-table";
import { getTeachers, type TTeachers } from "~/components/table/data";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { Button } from "app/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import Container from "~/components/ui/container";

const columns: ColumnDef<TTeachers>[] = [
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
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/dashboard/teachers/${teacher.id}`}>
              <DropdownMenuItem onClick={() => console.log("View", teacher.id)}>
                View
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => console.log("Edit", teacher.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete", teacher.id)}
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

export default function Teachers() {
  const [teachers, setTeachers] = useState<TTeachers[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();

        setTeachers(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const getActiveTeachers = teachers.filter((item) => item.status === "active");
  const getInactiveTeachers = teachers.filter(
    (item) => item.status === "inactive"
  );

  if (loading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <main>
      <div className="container mx-auto px-4 pb-5 pt-28 space-y-4">
        <h1 className="text-2xl font-bold">Teachers Page</h1>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-sm">
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Teachers</p>
            <p>{teachers.length}</p>
          </div>
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Active Teachers</p>
            <p>{getActiveTeachers.length}</p>
          </div>
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Inactive Teachers</p>
            <p>{getInactiveTeachers.length}</p>
          </div>
        </section>

        <section className="flex justify-end">
          <Link
            to={"/dashboard/teachers/add"}
            className="font-semibold text-sm"
          >
            <Button type="button" variant="outline">
              Add Teacher
            </Button>
          </Link>
        </section>

        <div>
          <BasicTable columns={columns} data={teachers} />
        </div>
      </div>
    </main>
  );
}
