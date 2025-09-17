import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "app/lib/utils";
import { format } from "date-fns";

import { Calendar } from "app/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "app/components/ui/command";
import { Input } from "app/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "app/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover";
import { Button } from "~/components/ui/button";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
] as const;

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middle_name: z.string().min(2, {
    message: "Middle name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phone_number: z
    .string()
    .regex(/^(09\d{9}|\+639\d{9})$/, "Invalid Philippine phone number"),
  dob: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid date format.",
    })
    .refine(
      (date) => {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return date <= cutoff;
      },
      {
        message: "Teacher must be at least 18 years old.",
      }
    ),
  gender: z.enum(["Male", "Female", ""]),
  address: z.string().min(5, {
    message: "Current address must be at least 5 characters.",
  }),
  email_address: z.string().email({
    message: "Invalid email address.",
  }),
});

export default function AddTeachers() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button" className="flex items-center">
          <Plus size={16} />
          <p>Add Teacher</p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register new teacher</DialogTitle>
          <DialogDescription>
            Register a new teacher for a grade level
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-2 space-y-8 lg:space-y-0">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <section className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-2 space-y-8 lg:space-y-0">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Gender</FormLabel>
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
                              ? genders.find(
                                  (genders) => genders.value === field.value
                                )?.label
                              : "Select gender"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {genders.map((gender) => (
                                <CommandItem
                                  value={gender.label}
                                  key={gender.value}
                                  onSelect={() => {
                                    form.setValue("gender", gender.value);
                                  }}
                                >
                                  {gender.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      gender.value === field.value
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
            </section>

            <section className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-2 space-y-8 lg:space-y-0">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <FormField
              control={form.control}
              name="address"
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

            <section className="grid grid-cols-3 gap-x-2">
              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Register Teacher
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
