import BasicTable from "~/components/table/BasicTable";
import type { ColumnDef } from "@tanstack/react-table";
import {
  getClasses,
  getTeachers,
  type TClasses,
} from "~/components/table/data";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { Button } from "app/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const columns: ColumnDef<TClasses>[] = [
  {
    accessorKey: "id",
    header: "Class ID",
  },
  {
    accessorKey: "className",
    header: "Class Name",
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "studentsEnrolled",
    header: "No. Students Enrolled",
  },
  {
    accessorKey: "schedule",
    header: "Schedule",
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
            <DropdownMenuItem onClick={() => console.log("View", student.id)}>
              View
            </DropdownMenuItem>
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

export default async function Class() {
  const data = await getClasses();

  return (
    <main>
      <div className="container mx-auto px-4 pb-5 pt-28 space-y-4">
        <h1>Class Page</h1>

        <section className="grid grid-cols-4 gap-4 mt-8 text-sm">
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Class</p>
            <p>500</p>
          </div>
        </section>

        <div>
          <BasicTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
