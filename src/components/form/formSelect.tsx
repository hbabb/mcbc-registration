/**
 * src/components/form/FormSelect.tsx
 *
 * Reusable form select component that wraps ShadCN UI Form and Select components
 * Provides consistent styling and behavior across all form select inputs
 * Handles required field styling with bold labels and red asterisks
 */

import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps<T extends FieldValues> = {
  // React Hook Form Instance
  form: UseFormReturn<T>;
  // Field name path for form control
  name: FieldPath<T>;
  // Display label for the select
  label: string;
  // Array of options for the select dropdown
  options: SelectOption[];
  // Placeholder text for the select
  placeholder?: string;
  // Required field
  required?: boolean;
  // Disabled field
  disabled?: boolean;
  // Additional CSS classes
  className?: string;
};

export function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(required && 'font-bold')}>
            {label}
            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(options => (
                <SelectItem
                  key={options.value}
                  value={options.value}
                >
                  {options.label}
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
