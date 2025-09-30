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
import { Plus } from "lucide-react";
import {
  all_grade_levels,
  all_sections,
  type SelectOption,
} from "~/lib/placeholders";
import { getClasses, type TClasses } from "~/components/table/data";
import { useEffect, useState } from "react";
import FormSelect from "~/components/form/ui/FormSelect";
import FormInput from "~/components/form/ui/FormInput";

const formSchema = z.object({
  class: z.string().min(1, {
    message: "Grade is required.",
  }),
  section: z.string().min(1, {
    message: "Section is required.",
  }),
  capacity: z.string().min(1, {
    message: "Capacity is required.",
  }),
  room: z.string().min(1, {
    message: "Room is required",
  }),
  teacher: z.string().min(1, {
    message: "Teacher is required.",
  }),
});

export default function AddClasses() {
  const [classes, setClasses] = useState<TClasses[]>([]);

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: "",
      section: "",
      capacity: "",
      room: "",
      teacher: "",
    },
  });

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
      <DialogTrigger asChild>
        <Button type="button" className="flex items-center">
          <Plus size={16} />
          <p>Add Class</p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new section</DialogTitle>
          <DialogDescription>
            Create a new section for a grade level
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
              name="capacity"
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
                  Create Section
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
