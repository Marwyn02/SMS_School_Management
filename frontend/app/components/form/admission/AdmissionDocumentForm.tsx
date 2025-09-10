import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { useFileStore, type FileState } from "~/stores/user/admissionFileStore";
import { useEffect } from "react";
import {
  useAdmissionStore,
  type AdmissionState,
} from "~/stores/user/admissionStore";

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

  function buildAdmissionPayload(
    state: AdmissionState,
    stateFiles: FileState["files"],
    isReadable: FileState["isReadable"]
  ) {
    if (
      !state.studentDetails ||
      !state.studentAcademic ||
      !state.studentParents
    ) {
      throw new Error("Incomplete admission data");
    }

    const formData = new FormData();

    // student details
    formData.append("first_name", state.studentDetails.firstName);
    if (state.studentDetails.middleName) {
      formData.append("middle_name", state.studentDetails.middleName);
    }
    formData.append("last_name", state.studentDetails.lastName);
    formData.append("dob", state.studentDetails.dob);
    formData.append("gender", state.studentDetails.gender);
    formData.append("nationality", state.studentDetails.nationality);
    formData.append("religion", state.studentDetails.religion);
    formData.append("email", state.studentDetails.email);
    formData.append("phone_number", state.studentDetails.phone);
    formData.append("permanent_address", state.studentDetails.permanentAddress);
    formData.append("current_address", state.studentDetails.currentAddress);

    // guardian
    formData.append(
      "guardian[full_name]",
      state.studentParents.guardianFullName
    );
    formData.append(
      "guardian[relationship]",
      state.studentParents.guardianRelationship
    );
    formData.append(
      "guardian[phone_number]",
      state.studentParents.guardianContactNumber
    );
    formData.append(
      "guardian[email_address]",
      state.studentParents.guardianEmailAddress
    );
    formData.append("guardian[address]", state.studentParents.guardianAddress);
    formData.append(
      "guardian[occupation]",
      state.studentParents.guardianOccupation
    );

    // academic
    formData.append(
      "academic[previous_school]",
      state.studentAcademic.previousSchool
    );
    formData.append(
      "academic[level_category]",
      state.studentAcademic.levelCategory
    );
    formData.append(
      "academic[grade_levels]",
      state.studentAcademic.gradeLevels
    );
    formData.append(
      "academic[academic_strands]",
      state.studentAcademic.academicStrands
    );

    // documents (files)
    // documents (files)
    if (stateFiles?.birthCert) {
      formData.append("documents[birth_cert_url]", stateFiles.birthCert);
      formData.append(
        "documents[is_birth_cert_readable]",
        isReadable.birthCert ? "1" : "0"
      );
    }
    if (stateFiles?.reportCard) {
      formData.append("documents[report_card_url]", stateFiles.reportCard);
      formData.append(
        "documents[is_report_card_readable]",
        isReadable.reportCard ? "1" : "0"
      );
    }
    if (stateFiles?.goodMoral) {
      formData.append("documents[good_moral_url]", stateFiles.goodMoral);
      formData.append(
        "documents[is_good_moral_readable]",
        isReadable.goodMoral ? "1" : "0"
      );
    }
    if (stateFiles?.idParent) {
      formData.append("documents[parent_id_url]", stateFiles.idParent);
      formData.append(
        "documents[is_parent_id_readable]",
        isReadable.idParent ? "1" : "0"
      );
    }

    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    return formData;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const state = useAdmissionStore.getState();
    const payload = buildAdmissionPayload(state, values, {
      birthCert: values.isBirthCerthReadable,
      reportCard: values.isReportCardReadable,
      goodMoral: values.isGoodMoralReadable,
      idParent: values.isIdParentReadable,
    });

    setFile("birthCert", values.birthCert);
    setFile("goodMoral", values.goodMoral);
    setFile("reportCard", values.reportCard);
    setFile("idParent", values.idParent);

    console.log("Payload: ", payload);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/step4",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // withCredentials: true, // 👈 include cookies if your Laravel uses Sanctum
        }
      );

      console.log("Admission saved:", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }

    // navigate("/");
    //  return result;
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
