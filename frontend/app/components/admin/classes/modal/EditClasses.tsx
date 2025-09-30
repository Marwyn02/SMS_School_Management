import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "app/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { getClasses, type TClasses } from "~/components/table/data";
import { useEffect, useState } from "react";
import FormSelect from "~/components/form/ui/FormSelect";
import FormInput from "~/components/form/ui/FormInput";
import {
  all_grade_levels,
  all_sections,
  type SelectOption,
} from "~/lib/placeholders";
import { useClasses } from "~/hooks/useClasses";

const formSchema = z.object({
  class: z.string().min(1, {
    message: "Grade is required.",
  }),
  section: z.string().min(1, {
    message: "Section is required.",
  }),
  studentsEnrolled: z.number(),
  room: z.string().min(1, {
    message: "Room is required",
  }),
  teacher: z.string().min(1, {
    message: "Teacher is required.",
  }),
});

export default function EditClasses({ classId }: { classId: string }) {
  const { data: classes = [] } = useClasses();
  const [selectedClass, setSelectedClass] = useState<TClasses | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: "",
      section: "",
      studentsEnrolled: 0,
      room: "",
      teacher: "",
    },
  });

  useEffect(() => {
    getClasses().then((classes) => {
      const classData = classes.find((s: TClasses) => s.id === classId);
      if (classData) {
        setSelectedClass(classData);
        form.reset({
          class: classData.class,
          section: classData.section,
          studentsEnrolled: classData.studentsEnrolled,
          room: classData.room,
          teacher: classData.teacher,
        });
      }
    });
  }, [classId, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const teacherOptions: SelectOption[] = classes.map((teacher) => ({
    value: teacher.teacher,
    label: teacher.teacher,
  }));

  return (
    <Dialog>
      <DialogTrigger
        className={
          "w-full hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        }
      >
        Edit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-start pb-4 mb-2 border-b">
          <DialogTitle>
            Editing:{" "}
            {"Class:" +
              " " +
              selectedClass?.class +
              " " +
              selectedClass?.section}
          </DialogTitle>
          <DialogDescription className="capitalize">
            ID: {selectedClass?.id}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-2 space-y-8 lg:space-y-0">
              <FormSelect
                name="class"
                title="Grade Level"
                placeholder="Select grade level"
                formControl={form.control}
                values={all_grade_levels}
              />

              <FormSelect
                name="section"
                title="Select Name"
                placeholder="Select section"
                formControl={form.control}
                values={all_sections}
              />
            </section>

            <FormInput
              title="Capacity"
              name="studentsEnrolled"
              placeholder="40"
              type="number"
              formControl={form.control}
            />

            <FormInput
              title="Room Assignment"
              name="room"
              placeholder="e.g., Room 102"
              formControl={form.control}
            />

            <FormSelect
              name="teacher"
              title="Class Teacher"
              placeholder="Select teacher"
              formControl={form.control}
              values={teacherOptions}
            />

            <section className="grid grid-cols-3 gap-x-2">
              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Edit Class
                </Button>
              </div>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </section>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
