import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  labelText?: string; // Optional label text for the field
  type?: string; // Field input type (e.g., text, number, date, checkbox)
  condition?: boolean; // Optional condition to show/hide the field
  placeholder?: string; // Optional placeholder for the input field
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional custom onChange handler
};

export function CustomFormField({
  name,
  control,
  labelText,
  type = "text", // Default input type
  condition = true, // Default to always render
  placeholder = "", // Default to an empty placeholder
  onChange,
}: CustomFormFieldProps) {
  // Render only if the condition is true
  if (!condition) return null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder} // Add the optional placeholder
              onChange={(e) => {
                field.onChange(e); // Ensure React Hook Form handles changes
                onChange?.(e); // Call custom onChange if provided
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: string[]; // List of items for the select dropdown
  labelText?: string; // Optional label text
  condition?: boolean; // Optional condition to show/hide the field
};

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
  condition = true, // Default to always render
}: CustomFormSelectProps) {
  // Render only if the condition is true
  if (!condition) return null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <Select
            value={field.value || ""}
            onValueChange={(value) => field.onChange(value)}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select ${labelText || name}`}
                  defaultValue={field.value || ""}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFormSelect;
