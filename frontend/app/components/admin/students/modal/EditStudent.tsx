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
import { getStudents, type TStudents } from "~/components/table/data";
import { useEffect, useState } from "react";
import FormStudentInformation from "~/components/form/ui/FormStudentInformation";
import FormGuardianInformation from "~/components/form/ui/FormGuardianInformation";

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required.",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  middle_name: z.string().optional(),
  dob: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid date format.",
    }),
  email_address: z.string().email({
    message: "Invalid email address.",
  }),
  phone_number: z
    .string()
    .regex(/^(09\d{9}|\+639\d{9})$/, "Invalid Philippine phone number"),

  address: z.string().min(5, {
    message: "Current address must be at least 5 characters.",
  }),
  guardian_name: z.string().min(1, {
    message: "Guardian name is required.",
  }),
  guardian_phone_number: z
    .string()
    .regex(/^(09\d{9}|\+639\d{9})$/, "Invalid Philippine phone number"),

  guardian_email: z.string().email({
    message: "Invalid email address.",
  }),
  guardian_address: z.string().min(1, {
    message: "Address is required.",
  }),
  guardian_relation: z.string().min(1, {
    message: "Guardian relation to student is required.",
  }),
});

export default function EditStudent({ studentId }: { studentId: string }) {
  const [selectedStudent, setSelectedStudent] = useState<TStudents | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      phone_number: "",
      email_address: "",
      address: "",
      guardian_name: "",
      guardian_phone_number: "",
      guardian_email: "",
      guardian_relation: "",
      guardian_address: "",
    },
  });

  useEffect(() => {
    getStudents().then((students) => {
      const student = students.find((s: TStudents) => s.id === studentId);
      if (student) {
        setSelectedStudent(student);
        form.reset({
          first_name: student.first_name,
          last_name: student.last_name,
          middle_name: student.middle_name ?? "",
          phone_number: student.phone_number,
          email_address: student.email_address,
          address: student.address,
          dob: student.dob ? new Date(student.dob) : undefined,
          guardian_name: student.guardian_name,
          guardian_email: student.guardian_email,
          guardian_address: student.address,
          guardian_phone_number: student.guardian_phone_number,
          guardian_relation: student.guardian_relation,
        });
      }
    });
  }, [studentId, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
            {selectedStudent?.last_name +
              ", " +
              selectedStudent?.first_name +
              " " +
              selectedStudent?.middle_name}
          </DialogTitle>
          <DialogDescription className="capitalize">
            ID: {selectedStudent?.id}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormStudentInformation form={form} />
            <FormGuardianInformation form={form} />

            <section className="grid grid-cols-3 gap-x-2">
              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Edit Student
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
