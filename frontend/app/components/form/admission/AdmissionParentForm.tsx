import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { useAdmissionStore } from "app/stores/user/admissionStore";

const formSchema = z.object({
  guardianFullName: z.string().min(2, {
    message: "Parents or Guardian name is required.",
  }),
  guardianOccupation: z.string().min(2, {
    message: "Their occupation is required.",
  }),
  guardianContactNumber: z.string().min(2, {
    message: "Their contact number is required.",
  }),
  guardianEmailAddress: z.string().min(2, {
    message: "Their email address is required.",
  }),
  guardianAddress: z.string().min(2, {
    message: "Their home address is required.",
  }),
  guardianRelationship: z.string().min(2, {
    message: "This is required.",
  }),
});

export default function AdmissionParentForm() {
  const { setDocuments } = useAdmissionStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guardianFullName: "",
      guardianOccupation: "",
      guardianContactNumber: "",
      guardianEmailAddress: "",
      guardianAddress: "",
      guardianRelationship: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    navigate("/admission/step-3");

    // setDocuments({
    // guardianFullName: "",
    //   guardianOccupation: "",
    //   guardianContactNumber: "",
    //   guardianEmailAddress: "",
    //   guardianAddress: "",
    //   guardianRelationship: "",
    //   emergencyContactPerson: "",
    //   emergencyContactNumber: "",
    // });
  }
  return (
    <main>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="space-y-8">
              <h1 className="text-2xl font-semibold">
                Parent/Guardian Information
              </h1>

              <FormField
                control={form.control}
                name="guardianFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name of Father & Mother / Guardian
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guardianOccupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-x-2">
                <FormField
                  control={form.control}
                  name="guardianContactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardianEmailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="guardianAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guardianRelationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship to student</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <div className="grid grid-cols-2 gap-x-2">
              <Button
                type="button"
                className="w-full"
                variant={"outline"}
                onClick={() => navigate("/admission/step-1")}
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Save and Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
