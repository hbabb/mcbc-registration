"use client";
/**
 * src/components/views/Consent.tsx
 *
 * Simple consent form with two checkboxes
 * Photo release opt-out and terms & conditions agreement
 */

import type { UseFormReturn } from "react-hook-form";

import type { RegistrationFormData } from "@/schemas/formSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ConsentProps = {
  form: UseFormReturn<RegistrationFormData>;
};

export function Consent({ form }: ConsentProps) {
  return (
    <Card className="flex flex-col gap-8 bg-white/90 shadow-2xl">
      <CardHeader>
        <CardTitle className="font-subheading">Consent & Permissions</CardTitle>
        <CardDescription>
          Just two quick checkboxes to complete your registration!
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Photo Release Opt-Out */}
        <FormField
          control={form.control}
          name="consent.photoRelease"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-6 w-6 border-2 border-black"
                />
              </FormControl>
              <FormLabel>
                <span className="font-semibold text-red-500">
                  Opt-Out of photos/video Release
                </span>
                (check if you don&apos;t want your child in photos)
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Terms & Conditions Agreement */}
        <FormField
          control={form.control}
          name="consent.consentGiven"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-6 w-6 border-2 border-black"
                />
              </FormControl>
              <div>
                <FormLabel className="font-semibold">
                  I agree to the{" "}
                  <a
                    href="/terms-conditions"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Terms & Conditions
                  </a>
                  <span className="font-bold text-red-500">*</span>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
