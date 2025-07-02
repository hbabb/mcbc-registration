"use client";
/**
 * src/components/views/GuardianInfo.tsx
 *
 * Guardian/Parent information form section component
 * Contains all contact and address information for the parent/guardian
 * This information applies to all children in the registration
 * Displays as a card with proper form validation and styling
 */

import type { UseFormReturn } from "react-hook-form";

import type { RegistrationFormData } from "@/schemas/formSchema";

import { FormInput } from "@/components/form/formInput";
import { FormSelect } from "@/components/form/formSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { US_STATES } from "@/constants/statesArray";

type GuardianInfoProps = {
  form: UseFormReturn<RegistrationFormData>;
};

export function GuardianInfo({ form }: GuardianInfoProps) {
  return (
    <Card className="flex flex-col gap-8 bg-white/90 shadow-2xl">
      <CardHeader>
        <CardTitle>Parent/Guardian Information</CardTitle>
        <CardDescription>
          Please provide your contact information. This will be used for all
          children in this registration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Name Fields Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            form={form}
            name="guardians.firstName"
            label="First Name"
            placeholder="John"
            required
          />

          <FormInput
            form={form}
            name="guardians.lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <FormInput
            form={form}
            name="guardians.email"
            label="email"
            placeholder="john.doe@email.com"
            required
          />
        </div>

        {/* Phone Fields Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            form={form}
            name="guardians.phonePrimary"
            label="Primary Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            required
          />

          <FormInput
            form={form}
            name="guardians.phoneAlternate"
            label="Alternate Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <FormInput
            form={form}
            name="guardians.address1"
            label="Address Line 1"
            placeholder="123 Main Street"
            required
          />

          <FormInput
            form={form}
            name="guardians.address2"
            label="Address Line 2"
            placeholder="Apt. Suite, etc."
          />
        </div>

        {/* City, State, ZIP Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormInput
            form={form}
            name="guardians.city"
            label="City"
            placeholder="Campobello"
            required
          />

          <FormSelect
            form={form}
            name="guardians.state"
            label="State"
            options={US_STATES}
            placeholder="Select State"
            required
          />

          <FormInput
            form={form}
            name="guardians.zip"
            label="ZIP Code"
            placeholder="12345"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
