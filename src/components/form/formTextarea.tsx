/**
 * src/components/form/FormTextarea.tsx
 *
 * Reusable form textarea component that wraps ShadCN UI Form and Textarea components
 * Provides consistent styling and behavior across all form textarea inputs
 * Handles required field styling with bold labels and red asterisks
 */

import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type FormTextareaProps<T extends FieldValues> = {
  /** React Hook Form instance */
  form: UseFormReturn<T>;
  /** Field name path for form control */
  name: FieldPath<T>;
  /** Display label for the textarea */
  label: string;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Whether the field is required (adds bold styling and red asterisk) */
  required?: boolean;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Optional description text below the textarea */
  description?: string;
  /** Minimum height for the textarea */
  minHeight?: string;
  /** Additional CSS classes */
  className?: string;
};

export default function FormTextarea<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  description,
  minHeight = 'min-h-20',
  className,
}: FormTextareaProps<T>) {
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
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              className={cn(minHeight, className)}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
