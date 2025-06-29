"use client";
/**
 * src/components/views/EmergencyContact.tsx
 *
 * Emergency contact form section component with dynamic contact management
 * Single card containing multiple CardContent sections for each emergency contact
 * Supports 1-3 emergency contacts with add/remove functionality
 * First contact is required and cannot be removed
 */

import type { FieldPath, UseFormReturn } from "react-hook-form";

import { Minus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import type { RegistrationFormData } from "@/schemas/formSchema";

import { FormInput } from "@/components/form/formInput";
import { FormSelect } from "@/components/form/formSelect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RELATIONSHIP_OPTIONS } from "@/constants/relationshipOptions";

type EmergencyContactProps = {
  form: UseFormReturn<RegistrationFormData>;
};

export function EmergencyContact({ form }: EmergencyContactProps) {
  // useFieldArray hook for dynamic emergency contact management
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emergencyContacts",
  });

  // Add new emergency contact with default values
  const addContact = () => {
    if (fields.length < 3) {
      append({
        firstName: "",
        lastName: "",
        phonePrimary: "",
        relationship: "",
      });
    }
  };

  // Remove emergency contact (only if more than 1 contact exists)
  const removeContact = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Card className="flex flex-col gap-8 bg-white/90 shadow-2xl">
      <CardHeader>
        <CardTitle className="font-subheading">
          Emergency Contact Information
        </CardTitle>
        <CardDescription>
          Please provide at least one emergency contact who can be reached if we
          are unable to contact you directly.
          <br />
          This person should be authorized to pick up your child if needed.
        </CardDescription>
      </CardHeader>

      {/* Emergency Contact Section */}
      {fields.map((field, index) => (
        <CardContent key={field.id} className="space-y-8">
          {/* Contact Number Header */}
          {fields.length > 1 && (
            <div className="pb-2">
              <h3 className="font-subheading text-lg font-semibold">
                Emergency Contact {index + 1}
              </h3>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                form={form}
                name={
                  `emergencyContacts.${index}.firstName` as FieldPath<RegistrationFormData>
                }
                label="First Name"
                placeholder="John"
                required
              />

              <FormInput
                form={form}
                name={
                  `emergencyContacts.${index}.lastName` as FieldPath<RegistrationFormData>
                }
                label="Last Name"
                placeholder="Doe"
                required
              />
            </div>

            {/* Phone Field */}
            <FormInput
              form={form}
              name={
                `emergencyContacts.${index}.phonePrimary` as FieldPath<RegistrationFormData>
              }
              label="Phone"
              type="tel"
              placeholder="(555) 123-4567"
              required
            />

            {/* Relationship Field */}
            <FormSelect
              form={form}
              name={
                `emergencyContacts.${index}.relationship` as FieldPath<RegistrationFormData>
              }
              label="Relationship to Child"
              options={RELATIONSHIP_OPTIONS}
              placeholder="Select relationship"
              required
            />
          </div>

          {/* Action Buttons - Bottom right */}
          <div className="flex justify-end space-x-2 pt-4">
            {/* Remove Button - Only show if more than 1 contact */}
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeContact(index)}
                className="border-gray-300 bg-gray-600/50 text-gray-600 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}

            {/* Add button - Only on last contact and if under max limit */}
            {index === fields.length - 1 && fields.length < 3 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addContact}
                className="border-gray-300 bg-gray-600/50 text-gray-600 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}

            {/* Separator between contacts (except for last contact) */}
            {index < fields.length - 1 && (
              <div className="border-b border-gray-300 pb-6" />
            )}
          </div>
        </CardContent>
      ))}
    </Card>
  );
}
