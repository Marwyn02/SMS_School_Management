import BasicTable from "~/components/table/BasicTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { type TClasses } from "~/components/table/data";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { Button } from "app/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  MoreHorizontal,
  UserRoundCog,
  Users,
} from "lucide-react";
import Container from "~/components/ui/container";
import StatsCard from "~/components/admin/card/StatsCard";
import AttendanceOverview from "~/components/admin/classes/AttendanceOverview";
import AddClasses from "~/components/admin/classes/modal/AddClasses";

import { useStudents } from "~/hooks/useStudents";
import { useTeachers } from "~/hooks/useTeachers";
import { useClasses, useDeleteClasses } from "~/hooks/useClasses";
import DeleteModal from "~/components/admin/students/modal/DeleteModal";
import EditClasses from "~/components/admin/classes/modal/EditClasses";

const columns: ColumnDef<TClasses>[] = [
  {
    accessorKey: "id",
    header: "Class ID",
    cell: ({ row }) => {
      const classes = row.original;

      return <p className="capitalize">{classes.id}</p>;
    },
  },
  {
    accessorKey: "class",
    header: "Class & Section",
    cell: ({ row }) => {
      const classes = row.original;

      return (
        <p className="capitalize">
          {classes.class} - {classes.section}
        </p>
      );
    },
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
  },
  {
    accessorKey: "studentsEnrolled",
    header: "Capacity",
    cell: ({ row }) => {
      const classes = row.original;

      return (
        <div className="flex items-center gap-2">
          <span>{classes.studentsEnrolled}/40</span>
          <div className="w-16 h-2 bg-muted rounded-full">
            <div
              className="h-2 bg-primary rounded-full transition-all"
              style={{ width: `${(classes.studentsEnrolled / 40) * 100}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "academicYear",
    header: "Academic Year",
  },
  {
    accessorKey: "room",
    header: "Room",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const classes = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to={`/dashboard/classes/${classes.id}/detail`}>
              <DropdownMenuItem onClick={() => console.log("View", classes.id)}>
                View
              </DropdownMenuItem>
            </Link>

            <EditClasses classId={classes.id} />

            <DeleteModal
              id={classes.id}
              onDelete={async (id) => {
                await useDeleteClasses(id);
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ClassIndex() {
  const { data: students = [], isLoading: loadingStudents } = useStudents();
  const { data: teachers = [], isLoading: loadingTeachers } = useTeachers();
  const { data: classes = [], isLoading: loadingClasses } = useClasses();

  const isLoading = loadingStudents || loadingTeachers || loadingClasses;

  if (isLoading)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  const getActiveStudents = students.filter((item) => item.status === "active");
  const getPendingStudents = students.filter(
    (item) => item.status === "pending"
  );
  const getActiveTeachers = teachers.filter((item) => item.status === "active");

  return (
    <Container>
      <section className="flex justify-between items-end p-2 border rounded-md bg-gray-100">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <AddClasses />
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-sm">
        <StatsCard
          title={"Total Classes"}
          stats={classes.length}
          icon={GraduationCap}
          variant="black"
        />
        <StatsCard
          title={"Total Students"}
          stats={getActiveStudents.length}
          icon={Users}
          variant="blue"
        />
        <StatsCard
          title={"Unassigned Students"}
          stats={getPendingStudents.length}
          icon={UserRoundCog}
          variant="yellow"
        />
        <StatsCard
          title={"Active Teachers"}
          stats={getActiveTeachers.length}
          icon={BookOpen}
          variant="green"
        />
      </section>

      <BasicTable
        columns={columns}
        data={classes}
        title={"Class Directory"}
        icon={GraduationCap}
        variant="black"
      />

      <section>
        <AttendanceOverview />
      </section>
    </Container>
  );
}
