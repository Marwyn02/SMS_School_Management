import FormInput from "~/components/form/ui/FormInput";
import FormCalendar from "~/components/form/ui/FormCalendar";
import { Textarea } from "app/components/ui/textarea";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";

type FormStudentInformationProps = {
  form: any;
  isEdit?: boolean;
};

export default function FormStudentInformation({
  form,
  isEdit = false,
}: FormStudentInformationProps) {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-2 space-y-8 md:space-y-0">
        <FormInput
          name="first_name"
          title="First Name"
          formControl={form.control}
        />
        <FormInput
          name="last_name"
          title="Last Name"
          formControl={form.control}
        />
      </section>

      <section className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-2 space-y-8 lg:space-y-0">
        <FormInput
          name="middle_name"
          title="Middle Name"
          formControl={form.control}
        />
      </section>

      <FormCalendar
        name="dob"
        title="Date of Birth"
        formControl={form.control}
      />

      <div className="grid grid-cols-2 gap-x-2">
        <FormInput
          title="Phone Number"
          name="phone_number"
          formControl={form.control}
        />

        <FormInput
          title="Email Address"
          name="email_address"
          type="email"
          formControl={form.control}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
