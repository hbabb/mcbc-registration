/**
 * src/components/form/FormInput.tsx
 *
 * Reusable form input component that wraps ShadCN/UI form components
 * Provides consistent styling and behavior across all form inputs
 * Handles required field styling with bold labels and red asterisks
 */

import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = {
  // React Hook Form instance
  form: UseFormReturn<T>;
  // Field name path for form control
  name: FieldPath<T>;
  // Display label for the input
  label: string;
  // Placeholder text for the input
  placeholder?: string;
  // Mark the input as required
  required?: boolean;
  // HTML input type
  type?: "text" | "email" | "tel" | "password" | "number" | "date";
  // Mark the input disabled
  disabled?: boolean;
  // Additional CSS classes
  className?: string;
};

export function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  required = false,
  type = "text",
  disabled = false,
  className,
}: FormInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(required && "font-bold")}>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
