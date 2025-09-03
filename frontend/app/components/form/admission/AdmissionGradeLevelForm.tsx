import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "app/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "app/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { useAdmissionStore } from "app/stores/user/admissionStore";
import { useEffect, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

const levelCategories: SelectOption[] = [
  { value: "elementary", label: "Elementary" },
  { value: "highschool", label: "Highschool" },
  { value: "seniorHighschool", label: "Senior Highschool" },
];

const academicStrands = [
  { label: "STEM", value: "STEM" },
  { label: "ABM", value: "ABM" },
  { label: "HUMSS", value: "HUMSS" },
  { label: "GAS", value: "GAS" },
] as const;

const gradeLevels: Record<string, SelectOption[]> = {
  elementary: [
    { value: "grade1", label: "Grade 1" },
    { value: "grade2", label: "Grade 2" },
    { value: "grade3", label: "Grade 3" },
    { value: "grade4", label: "Grade 4" },
    { value: "grade5", label: "Grade 5" },
    { value: "grade6", label: "Grade 6" },
  ],
  highschool: [
    { value: "grade7", label: "Grade 7" },
    { value: "grade8", label: "Grade 8" },
    { value: "grade9", label: "Grade 9" },
    { value: "grade10", label: "Grade 10" },
  ],
  seniorHighschool: [
    { value: "grade11", label: "Grade 11" },
    { value: "grade12", label: "Grade 12" },
  ],
};

const formSchema = z.object({
  previousSchool: z.string().min(5, {
    message: "Previous School is required.",
  }),
  levelCategory: z.string().min(1, "Please select a level category"),
  gradeLevels: z.string().min(1, "Please select a grade level"),
  academicStrands: z.string().optional(),
});

export default function AdmissionGradeLevelForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { setStudentAcademic, studentAcademic } = useAdmissionStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      previousSchool: studentAcademic?.previousSchool || "",
      levelCategory: studentAcademic?.levelCategory || "",
      gradeLevels: studentAcademic?.gradeLevels || "",
      academicStrands:
        studentAcademic?.levelCategory === "seniorHighschool"
          ? studentAcademic?.academicStrands || ""
          : "",
    },
  });

  // Sync selectedCategory with form's levelCategory
  // Sync selectedCategory with form's levelCategory
  useEffect(() => {
    const levelCategory = form.getValues("levelCategory");
    if (levelCategory !== selectedCategory) {
      setSelectedCategory(levelCategory);
    }
  }, [form.getValues("levelCategory")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values) {
      setStudentAcademic({
        previousSchool: values.previousSchool,
        levelCategory: values.levelCategory,
        gradeLevels: values.gradeLevels,
        academicStrands:
          values.levelCategory === "seniorHighschool"
            ? values.academicStrands || ""
            : "",
      });

      navigate("/admission/step-4");
    }
  }

  const selectedGradeLevel = form.watch("levelCategory");
  return (
    <main>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="space-y-8">
              <h1 className="text-2xl font-semibold">
                Admission Level Selection
              </h1>

              <FormField
                control={form.control}
                name="previousSchool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous School</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="levelCategory"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Level Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? levelCategories.find(
                                  (category) => category.value === field.value
                                )?.label
                              : "Select level category"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {levelCategories.map((category) => (
                                <CommandItem
                                  value={category.label}
                                  key={category.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "levelCategory",
                                      category.value
                                    );
                                    form.setValue("gradeLevels", "");
                                    setSelectedCategory(category.value);
                                  }}
                                >
                                  {category.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      category.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Grade Level Selection */}
              {selectedGradeLevel && gradeLevels[selectedGradeLevel] && (
                <FormField
                  control={form.control}
                  name="gradeLevels"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Grade Level</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? gradeLevels[selectedGradeLevel].find(
                                    (level) => level.value === field.value
                                  )?.label
                                : "Select grade level"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {gradeLevels[selectedGradeLevel].map(
                                  (level) => (
                                    <CommandItem
                                      value={level.label}
                                      key={level.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "gradeLevels",
                                          level.value
                                        );
                                      }}
                                    >
                                      {level.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          level.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedGradeLevel === "seniorHighschool" && (
                <FormField
                  control={form.control}
                  name="academicStrands"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Academic Strand</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? academicStrands.find(
                                    (strand) => strand.value === field.value
                                  )?.label
                                : "Select academic strand"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {academicStrands.map((strand) => (
                                  <CommandItem
                                    value={strand.label}
                                    key={strand.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "academicStrands",
                                        strand.value
                                      );
                                    }}
                                  >
                                    {strand.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        strand.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
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
                onClick={() => navigate("/admission/step-2")}
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
