import BasicTable from "~/components/table/BasicTable";
import type { ColumnDef } from "@tanstack/react-table";
import { getData, type TStudent } from "~/components/table/data";

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

export default async function Student() {
  const data = await getData();

  return (
    <main>
      <div className="container mx-auto px-4 pb-5 pt-28 space-y-4">
        <h1>Student Page</h1>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-sm">
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Student</p>
            <p>500</p>
          </div>
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Active Students</p>
            <p>310</p>
          </div>
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Graduated Students</p>
            <p>70</p>
          </div>
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Pending Students</p>
            <p>21</p>
          </div>
          <div className="border p-3 rounded-md">
            <p className="font-semibold">Total Inactive Students</p>
            <p>5</p>
          </div>
        </section>

        <div>
          <BasicTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
