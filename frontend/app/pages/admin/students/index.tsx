import { Link } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useDeleteStudents, useStudents } from "~/hooks/useStudents";
import { GraduationCap, MoreHorizontal, UserRoundX, Users } from "lucide-react";

import { Button } from "app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import BasicTable from "app/components/table/BasicTable";
import Container from "app/components/ui/container";

import { type TStudents } from "app/components/table/data";
import StatsCard from "~/components/admin/card/StatsCard";
import EditStudent from "~/components/admin/students/modal/EditStudent";
import DeleteModal from "~/components/admin/students/modal/DeleteModal";

const columns: ColumnDef<TStudents>[] = [
  {
    accessorKey: "id",
    header: "Student Id",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div>
          <p className="capitalize">{student.id}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div>
          <p className="capitalize">
            {student.last_name +
              ", " +
              student.first_name +
              " " +
              student.middle_name}
          </p>
          <p className="text-gray-500">{student.email_address}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <div>
          <p className="capitalize">
            Grade {student.grade} - Section {student.section}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div>
          <p
            className={`capitalize font-medium ${status === "active" ? "text-green-600" : status === "pending" ? "text-orange-400" : status === "inactive" ? "text-red-500" : "text-gray-600"}`}
          >
            {status}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              data-testid={`actions-btn-${student.id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/dashboard/students/${student.id}/profile`}>
              <DropdownMenuItem onClick={() => console.log("View", student.id)}>
                View
              </DropdownMenuItem>
            </Link>

            <EditStudent studentId={student.id} />

            <DeleteModal
              id={student.id}
              onDelete={async (id) => {
                await useDeleteStudents(id);
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Students() {
  const { data: students = [], isLoading, isError, refetch } = useStudents();

  const getActiveStudents = students.filter((item) => item.status === "active");
  const getInactiveStudents = students.filter(
    (item) => item.status === "inactive"
  );
  const getGraduatedStudents = students.filter(
    (item) => item.status === "graduated"
  );

  if (isLoading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  if (isError)
    return (
      <Container>
        <p>Something went wrong</p>
      </Container>
    );

  return (
    <Container>
      <section className="flex justify-between items-end p-2 border rounded-md bg-gray-100">
        <h1 className="text-2xl font-bold">Student Management</h1>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-sm">
        <StatsCard
          title="Total Active Students"
          stats={getActiveStudents.length}
          icon={Users}
          variant="blue"
        />
        <StatsCard
          title="Total Graduated Students"
          stats={getGraduatedStudents.length}
          icon={GraduationCap}
        />
        <StatsCard
          title="Total Inactive Students"
          stats={getInactiveStudents.length}
          icon={UserRoundX}
          variant="red"
        />
      </section>

      <div>
        <BasicTable
          columns={columns}
          data={students}
          title="Students List"
          icon={Users}
          variant="green"
        />
      </div>
    </Container>
  );
}
