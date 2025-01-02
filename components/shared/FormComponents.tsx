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
import { Input } from "../ui/input";
import { Info } from "lucide-react";
import { TooltipWrapper } from "./TooltipWrapper";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  labelText?: string; // Optional label text for the field
  type?: string; // Field input type (e.g., text, number, date, checkbox)
  as?: "input" | "textarea"; // Option to render textarea
  condition?: boolean; // Optional condition to show/hide the field
  placeholder?: string; // Optional placeholder for the input field
  value?: string; // Optional custom value for controlled fields
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // Optional custom onChange handler
  isRequired?: boolean; // Flag for required fields
  tooltip?: string; // Tooltip content (optional)
  className?: string; // Additional class names for styling
};

export function CustomFormField({
  name,
  control,
  labelText,
  type = "text", // Default input type
  as = "input", // Default to input
  condition = true, // Default to always render
  placeholder = "", // Default to an empty placeholder
  value,
  onChange,
  isRequired = false, // Default to not required
  tooltip, // Tooltip content
  className, // Additional class names
}: CustomFormFieldProps) {
  // Render only if the condition is true
  if (!condition) return null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormLabel className="capitalize">
              {labelText || name}{" "}
              {isRequired && (
                <span className="text-secondary">*</span> // Asterisk for required fields
              )}
            </FormLabel>
            {tooltip && (
              <TooltipWrapper content={tooltip}>
                <Info className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-help" />
              </TooltipWrapper>
            )}
          </div>
          <FormControl>
            {as === "textarea" ? (
              <textarea
                {...field}
                placeholder={placeholder} // Add the optional placeholder
                value={value !== undefined ? value : field.value} // Use custom value if provided
                onChange={(e) => {
                  field.onChange(e); // Ensure React Hook Form handles changes
                  onChange?.(e); // Call custom onChange if provided
                }}
                className={`w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 ${className}`}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder} // Add the optional placeholder
                value={value !== undefined ? value : field.value} // Use custom value if provided
                onChange={(e) => {
                  field.onChange(e); // Ensure React Hook Form handles changes
                  onChange?.(e); // Call custom onChange if provided
                }}
                className={className}
              />
            )}
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
  isRequired?: boolean; // Flag for required fields
  tooltip?: string; // Tooltip content (optional)
};

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
  condition = true, // Default to always render
  isRequired = false, // Default to not required
  tooltip, // Tooltip content
}: CustomFormSelectProps) {
  // Render only if the condition is true
  if (!condition) return null;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormLabel className="capitalize">
              {labelText || name}{" "}
              {isRequired && (
                <span className="text-secondary">*</span> // Asterisk for required fields
              )}
            </FormLabel>
            {tooltip && (
              <TooltipWrapper content={tooltip}>
                <Info className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-help" />
              </TooltipWrapper>
            )}
          </div>
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
