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
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useAdmissionStore } from "~/stores/user/admissionStore";

const formSchema = z.object({
  birthCert: z.instanceof(File, { message: "Birth certificate is required." }),
  reportCard: z.instanceof(File, {
    message: "Report Card or Transcript is required.",
  }),
  goodMoral: z.instanceof(File, {
    message: "Good Moral Certificate is required.",
  }),
  idParent: z.instanceof(File, {
    message: "ID of Parents/Guardian is required.",
  }),
  isBirthCerthReadable: z.boolean().refine((val) => val === true, {
    message: "You must confirm the file is clear and readable.",
  }),
  isReportCardReadable: z.boolean().refine((val) => val === true, {
    message: "You must confirm the file is clear and readable.",
  }),
  isGoodMoralReadable: z.boolean().refine((val) => val === true, {
    message: "You must confirm the file is clear and readable.",
  }),
  isIdParentReadable: z.boolean().refine((val) => val === true, {
    message: "You must confirm the file is clear and readable.",
  }),
});

export default function AdmissionDocumentForm() {
  const { setDocuments } = useAdmissionStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // setDocuments({
    //   birthCert: "",
    //   reportCard: "",
    //   goodMoral: "",
    //   idParent: "",
    // });

    navigate("/");
  }
  return (
    <main>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h1 className="text-2xl font-semibold">Required Documents</h1>

            <section className="space-y-4">
              <FormField
                control={form.control}
                name="birthCert"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Certificate</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    {field.value && (
                      <div className="mt-2">
                        {field.value.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="h-[250px] rounded-md object-cover"
                          />
                        ) : (
                          <a
                            href={URL.createObjectURL(field.value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 text-sm font-medium underline"
                          >
                            View {field.value.name}
                          </a>
                        )}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("birthCert") && (
                <FormField
                  control={form.control}
                  name="isBirthCerthReadable"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        I confirm this file is clear and readable
                      </FormLabel>
                    </FormItem>
                  )}
                />
              )}
            </section>

            <section className="space-y-4">
              <FormField
                control={form.control}
                name="reportCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Card</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    {field.value && (
                      <div className="mt-2">
                        {field.value.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="h-[250px] rounded-md object-cover"
                          />
                        ) : (
                          <a
                            href={URL.createObjectURL(field.value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 text-sm font-medium underline"
                          >
                            View {field.value.name}
                          </a>
                        )}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("reportCard") && (
                <FormField
                  control={form.control}
                  name="isReportCardReadable"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        I confirm this file is clear and readable
                      </FormLabel>
                    </FormItem>
                  )}
                />
              )}
            </section>

            <section className="space-y-4">
              <FormField
                control={form.control}
                name="goodMoral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Good Moral Certificate</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    {field.value && (
                      <div className="mt-2">
                        {field.value.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="h-[250px] rounded-md object-cover"
                          />
                        ) : (
                          <a
                            href={URL.createObjectURL(field.value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 text-sm font-medium underline"
                          >
                            View {field.value.name}
                          </a>
                        )}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("goodMoral") && (
                <FormField
                  control={form.control}
                  name="isGoodMoralReadable"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        I confirm this file is clear and readable
                      </FormLabel>
                    </FormItem>
                  )}
                />
              )}
            </section>

            <section className="space-y-4">
              <FormField
                control={form.control}
                name="idParent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID of Parents/Guardian</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    {field.value && (
                      <div className="mt-2">
                        {field.value.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="h-[250px] rounded-md object-cover"
                          />
                        ) : (
                          <a
                            href={URL.createObjectURL(field.value)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 text-sm font-medium underline"
                          >
                            View {field.value.name}
                          </a>
                        )}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("idParent") && (
                <FormField
                  control={form.control}
                  name="isIdParentReadable"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        I confirm this file is clear and readable
                      </FormLabel>
                    </FormItem>
                  )}
                />
              )}
            </section>

            <div className="grid grid-cols-2 gap-x-2">
              <Button
                type="button"
                className="w-full"
                variant={"outline"}
                onClick={() => navigate("/admission/step-3")}
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
