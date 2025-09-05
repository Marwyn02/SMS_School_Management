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
import { useFileStore } from "~/stores/user/admissionFileStore";
import { useEffect } from "react";

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
  const { setFile } = useFileStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isBirthCerthReadable: false,
      isReportCardReadable: false,
      isGoodMoralReadable: false,
      isIdParentReadable: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // CANT STORE FILES IN THE LOCALSTORAGE
    // KAYA NAKA GLOBAL STATE MANAGEMENT LANG SIYAA
    setFile("birthCert", values.birthCert);
    setFile("goodMoral", values.goodMoral);
    setFile("reportCard", values.reportCard);
    setFile("idParent", values.idParent);

    // YOU CAN SETUP THE API ROUTE AND SAVE TO DATABASE THE ADMISSION DATA.

    // ALL DATA TYPE ARE IN THE app/store/user

    // GO TO HOME NA TO AFTER SUBMITTING
    navigate("/");
  }

  useEffect(() => {
    const urls: string[] = [];
    const files = form.watch();
    if (files.birthCert) urls.push(URL.createObjectURL(files.birthCert));
    if (files.reportCard) urls.push(URL.createObjectURL(files.reportCard));
    if (files.goodMoral) urls.push(URL.createObjectURL(files.goodMoral));
    if (files.idParent) urls.push(URL.createObjectURL(files.idParent));

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [
    form.watch("birthCert"),
    form.watch("reportCard"),
    form.watch("goodMoral"),
    form.watch("idParent"),
  ]);
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
