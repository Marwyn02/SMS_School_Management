import { type TClasses, type TStudents } from "~/components/table/data";
import Container from "~/components/ui/container";
import StatsCard from "../card/StatsCard";
import {
  Calendar,
  ChevronLeft,
  MoreHorizontal,
  Pin,
  Users,
} from "lucide-react";
import BasicTable from "~/components/table/BasicTable";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { ColumnDef } from "@tanstack/react-table";
import { useStudents } from "~/hooks/useStudents";

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
    header: "Name",
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

export default function ClassesProfile({ data }: { data: TClasses }) {
  const { data: students = [], isLoading, isError, refetch } = useStudents();

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  if (isError)
    return (
      <Container>
        <p>Something went wrong</p>
      </Container>
    );

  return (
    <Container>
      <Link
        to={"/dashboard/classes"}
        className="font-semibold text-sm flex items-center justify-center py-0.5 px-2 bg-gray-100 border border-gray-200 rounded-full w-min"
      >
        <ChevronLeft size={16} /> <p>Back</p>
      </Link>

      <section className="space-y-4 mt-8 text-sm">
        <section className="border p-3 rounded-md bg-gray-100">
          <h1 className="text-2xl font-bold">
            {data.class} - {data.section}
          </h1>
          <p className="font-semibold text-gray-600">{data.teacher}</p>
        </section>

        <section className="grid grid-cols-2 gap-x-2">
          <StatsCard
            title="Total Students"
            stats={data.studentsEnrolled}
            icon={Users}
            variant="blue"
          />
          <StatsCard title="Room" stats={Number(data.room)} icon={Pin} />
        </section>

        <Tabs defaultValue="student_list" className="w-full">
          <TabsList>
            <TabsTrigger value="student_list">Student List</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="student_list">
            <section className="border p-3 rounded-md space-y-4">
              <div className="flex items-center gap-x-2">
                <Users size={18} />
                <h3 className="text-xl font-bold">Student List</h3>
              </div>

              <BasicTable columns={columns} data={students} />
            </section>
          </TabsContent>
          <TabsContent value="schedule">
            <section className="border p-3 rounded-md space-y-4">
              <div className="flex items-center gap-x-2">
                <Calendar size={18} />
                <h3 className="text-xl font-bold">Weekly Schedule</h3>
              </div>

              <section className="space-y-2">
                <div className="bg-blue-50 border border-gray-100 rounded-md p-4">
                  <div className="flex justify-between items-center font-medium">
                    <p>Monday</p>
                    <p>Mathematics</p>
                  </div>

                  <div className="flex justify-between items-start text-gray-500 text-sm">
                    <p>09:00 - 10:00</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-gray-100 rounded-md p-4">
                  <div className="flex justify-between items-center font-medium">
                    <p>Tuesday</p>
                    <p>Science</p>
                  </div>

                  <div className="flex justify-between items-start text-gray-500 text-sm">
                    <p>09:00 - 10:00</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-gray-100 rounded-md p-4">
                  <div className="flex justify-between items-center font-medium">
                    <p>Wednesday</p>
                    <p>History</p>
                  </div>

                  <div className="flex justify-between items-start text-gray-500 text-sm">
                    <p>09:00 - 10:00</p>
                  </div>
                </div>
              </section>
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </Container>
  );
}
