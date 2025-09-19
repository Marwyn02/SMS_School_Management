import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";

type FormInputProps = {
  title: string;
  placeholder?: string;
  name: string;
  formControl: any;
  type?: string;
};

export default function FormInput({
  title,
  placeholder,
  name,
  formControl,
  type = "text",
}: FormInputProps) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
